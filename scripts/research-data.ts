/**
 * TikTok Hook Research Data Manager
 * 
 * Stores research data locally in JSON and generates SQL for Supabase migration.
 * Use this to research viral videos without database access.
 * 
 * Usage:
 *   npx ts-node scripts/research-data.ts add <niche> <url> <views> <hook> [options]
 *   npx ts-node scripts/research-data.ts list [niche]
 *   npx ts-node scripts/research-data.ts progress
 *   npx ts-node scripts/research-data.ts export-sql
 *   npx ts-node scripts/research-data.ts export-hooks
 */

import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DATA_DIR = path.join(__dirname, '../data');
const VIDEOS_FILE = path.join(DATA_DIR, 'viral-videos.json');
const HOOKS_FILE = path.join(DATA_DIR, 'hooks.json');
const PROGRESS_FILE = path.join(DATA_DIR, 'research-progress.json');

interface ViralVideo {
  id: string;
  tiktok_url: string;
  creator_username: string;
  view_count: number;
  like_count?: number;
  comment_count?: number;
  share_count?: number;
  niche: string;
  hook_text: string;
  full_transcript?: string;
  hook_style?: string;
  hook_pattern?: string;
  hook_duration_seconds?: number;
  video_duration_seconds?: number;
  date_posted?: string;
  date_researched: string;
  notes?: string;
  is_preset: boolean;
}

interface Hook {
  id: string;
  text: string;
  niche: string;
  style?: string;
  source_url?: string;
  view_count?: number;
  save_count: number;
  tags?: string[];
  hook_pattern?: string;
  is_preset: boolean;
  source_video_id?: string;
}

interface Progress {
  niches: Record<string, {
    videos_found: number;
    target: number;
    completed: boolean;
    last_updated: string;
  }>;
  total_videos: number;
  total_hooks: number;
  started_at: string;
  last_updated: string;
}

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Load or initialize data files
function loadVideos(): ViralVideo[] {
  if (fs.existsSync(VIDEOS_FILE)) {
    return JSON.parse(fs.readFileSync(VIDEOS_FILE, 'utf-8'));
  }
  return [];
}

function loadHooks(): Hook[] {
  if (fs.existsSync(HOOKS_FILE)) {
    return JSON.parse(fs.readFileSync(HOOKS_FILE, 'utf-8'));
  }
  return [];
}

function loadProgress(): Progress {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
  }
  // Initialize with all 50 niches
  const niches = [
    'fitness', 'weightlifting', 'running', 'yoga', 'nutrition', 'mental-health', 'skincare', 'haircare', 'beauty', 'home-gym',
    'business', 'finance', 'side-hustle', 'startup', 'career', 'real-estate', 'crypto', 'investing',
    'education', 'science', 'history', 'psychology', 'philosophy', 'student-life', 'books',
    'lifestyle', 'self-improvement', 'productivity', 'motivation', 'relationships', 'parenting', 'fashion', 'spirituality',
    'comedy', 'gaming', 'movies', 'music', 'sports', 'pets', 'travel',
    'tech', 'food', 'cooking', 'baking', 'coffee', 'art', 'photography', 'diy', 'home-decor', 'cars'
  ];
  
  const progress: Progress = {
    niches: {},
    total_videos: 0,
    total_hooks: 0,
    started_at: new Date().toISOString(),
    last_updated: new Date().toISOString()
  };
  
  for (const niche of niches) {
    progress.niches[niche] = {
      videos_found: 0,
      target: 10,
      completed: false,
      last_updated: new Date().toISOString()
    };
  }
  
  return progress;
}

function saveVideos(videos: ViralVideo[]) {
  fs.writeFileSync(VIDEOS_FILE, JSON.stringify(videos, null, 2));
}

function saveHooks(hooks: Hook[]) {
  fs.writeFileSync(HOOKS_FILE, JSON.stringify(hooks, null, 2));
}

function saveProgress(progress: Progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// Add a new viral video
function addVideo(
  niche: string,
  tiktok_url: string,
  view_count: number,
  hook_text: string,
  options: Partial<ViralVideo> = {}
): { video: ViralVideo; hook: Hook } {
  const videos = loadVideos();
  const hooks = loadHooks();
  const progress = loadProgress();
  
  // Check for duplicate URL
  if (videos.some(v => v.tiktok_url === tiktok_url)) {
    throw new Error(`Video already exists: ${tiktok_url}`);
  }
  
  const videoId = uuidv4();
  const hookId = uuidv4();
  
  // Extract username from URL if not provided
  let creator_username = options.creator_username || '';
  if (!creator_username && tiktok_url) {
    const match = tiktok_url.match(/@([^/]+)/);
    if (match) creator_username = match[1];
  }
  
  const video: ViralVideo = {
    id: videoId,
    tiktok_url,
    creator_username,
    view_count,
    niche: niche.toLowerCase(),
    hook_text,
    date_researched: new Date().toISOString(),
    is_preset: true,
    ...options
  };
  
  const hook: Hook = {
    id: hookId,
    text: hook_text,
    niche: niche.toLowerCase(),
    style: options.hook_style,
    source_url: tiktok_url,
    view_count,
    save_count: Math.floor(view_count / 1000), // Estimate save count
    hook_pattern: options.hook_pattern,
    is_preset: true,
    source_video_id: videoId
  };
  
  videos.push(video);
  hooks.push(hook);
  
  // Update progress
  const nicheKey = niche.toLowerCase();
  if (progress.niches[nicheKey]) {
    progress.niches[nicheKey].videos_found++;
    progress.niches[nicheKey].last_updated = new Date().toISOString();
    if (progress.niches[nicheKey].videos_found >= progress.niches[nicheKey].target) {
      progress.niches[nicheKey].completed = true;
    }
  }
  progress.total_videos = videos.length;
  progress.total_hooks = hooks.length;
  progress.last_updated = new Date().toISOString();
  
  saveVideos(videos);
  saveHooks(hooks);
  saveProgress(progress);
  
  return { video, hook };
}

// List videos by niche
function listVideos(niche?: string) {
  const videos = loadVideos();
  if (niche) {
    return videos.filter(v => v.niche === niche.toLowerCase());
  }
  return videos;
}

// Show progress
function showProgress() {
  const progress = loadProgress();
  const videos = loadVideos();
  
  console.log('\n📊 TikTok Hook Research Progress\n');
  console.log(`Total Videos: ${progress.total_videos} / 500`);
  console.log(`Total Hooks: ${progress.total_hooks}`);
  console.log(`Started: ${new Date(progress.started_at).toLocaleDateString()}`);
  console.log(`Last Updated: ${new Date(progress.last_updated).toLocaleString()}\n`);
  
  // Group by completion status
  const completed: string[] = [];
  const inProgress: string[] = [];
  const notStarted: string[] = [];
  
  for (const [niche, data] of Object.entries(progress.niches)) {
    if (data.completed) {
      completed.push(niche);
    } else if (data.videos_found > 0) {
      inProgress.push(`${niche} (${data.videos_found}/${data.target})`);
    } else {
      notStarted.push(niche);
    }
  }
  
  console.log(`✅ Completed (${completed.length}/50): ${completed.join(', ') || 'None'}`);
  console.log(`\n🔄 In Progress (${inProgress.length}): ${inProgress.join(', ') || 'None'}`);
  console.log(`\n⏳ Not Started (${notStarted.length}): ${notStarted.join(', ')}`);
}

// Export to SQL
function exportSQL() {
  const videos = loadVideos();
  const hooks = loadHooks();
  
  let sql = '-- HookViral Viral Videos Export\n';
  sql += `-- Generated: ${new Date().toISOString()}\n`;
  sql += `-- Total Videos: ${videos.length}\n`;
  sql += `-- Total Hooks: ${hooks.length}\n\n`;
  
  // Videos INSERT statements
  sql += '-- VIRAL VIDEOS\n';
  for (const v of videos) {
    sql += `INSERT INTO viral_videos (id, tiktok_url, creator_username, view_count, niche, hook_text, hook_style, hook_pattern, is_preset, date_researched) VALUES (\n`;
    sql += `  '${v.id}',\n`;
    sql += `  '${v.tiktok_url.replace(/'/g, "''")}',\n`;
    sql += `  '${(v.creator_username || '').replace(/'/g, "''")}',\n`;
    sql += `  ${v.view_count},\n`;
    sql += `  '${v.niche}',\n`;
    sql += `  '${v.hook_text.replace(/'/g, "''")}',\n`;
    sql += `  ${v.hook_style ? `'${v.hook_style}'` : 'NULL'},\n`;
    sql += `  ${v.hook_pattern ? `'${v.hook_pattern}'` : 'NULL'},\n`;
    sql += `  true,\n`;
    sql += `  '${v.date_researched}'\n`;
    sql += `) ON CONFLICT (tiktok_url) DO NOTHING;\n\n`;
  }
  
  // Hooks INSERT statements
  sql += '\n-- HOOKS\n';
  for (const h of hooks) {
    sql += `INSERT INTO hooks (id, text, niche, style, source_url, view_count, save_count, hook_pattern, is_preset, source_video_id) VALUES (\n`;
    sql += `  '${h.id}',\n`;
    sql += `  '${h.text.replace(/'/g, "''")}',\n`;
    sql += `  '${h.niche}',\n`;
    sql += `  ${h.style ? `'${h.style}'` : 'NULL'},\n`;
    sql += `  ${h.source_url ? `'${h.source_url.replace(/'/g, "''")}'` : 'NULL'},\n`;
    sql += `  ${h.view_count || 'NULL'},\n`;
    sql += `  ${h.save_count},\n`;
    sql += `  ${h.hook_pattern ? `'${h.hook_pattern}'` : 'NULL'},\n`;
    sql += `  true,\n`;
    sql += `  ${h.source_video_id ? `'${h.source_video_id}'` : 'NULL'}\n`;
    sql += `) ON CONFLICT DO NOTHING;\n\n`;
  }
  
  const sqlFile = path.join(DATA_DIR, 'export.sql');
  fs.writeFileSync(sqlFile, sql);
  console.log(`SQL exported to ${sqlFile}`);
  return sql;
}

// CLI
const [,, command, ...args] = process.argv;

switch (command) {
  case 'add': {
    const [niche, url, views, ...hookParts] = args;
    const hook = hookParts.join(' ');
    if (!niche || !url || !views || !hook) {
      console.log('Usage: add <niche> <url> <views> <hook text>');
      process.exit(1);
    }
    const result = addVideo(niche, url, parseInt(views), hook);
    console.log('✅ Added video:', result.video.id);
    console.log('📝 Created hook:', result.hook.text.substring(0, 50) + '...');
    break;
  }
  case 'list': {
    const niche = args[0];
    const videos = listVideos(niche);
    console.log(`\nVideos${niche ? ` for ${niche}` : ''}: ${videos.length}\n`);
    for (const v of videos) {
      console.log(`[${v.niche}] ${v.hook_text.substring(0, 60)}...`);
      console.log(`   Views: ${v.view_count.toLocaleString()} | @${v.creator_username}`);
      console.log(`   ${v.tiktok_url}\n`);
    }
    break;
  }
  case 'progress':
    showProgress();
    break;
  case 'export-sql':
    exportSQL();
    break;
  case 'export-hooks': {
    const hooks = loadHooks();
    const hooksFile = path.join(DATA_DIR, 'hooks-export.json');
    fs.writeFileSync(hooksFile, JSON.stringify(hooks, null, 2));
    console.log(`Hooks exported to ${hooksFile}`);
    break;
  }
  default:
    console.log(`
TikTok Hook Research Data Manager

Commands:
  add <niche> <url> <views> <hook>  - Add a viral video
  list [niche]                      - List videos
  progress                          - Show research progress
  export-sql                        - Export to SQL
  export-hooks                      - Export hooks to JSON
    `);
}

// Export functions for programmatic use
export { addVideo, listVideos, loadVideos, loadHooks, loadProgress, showProgress, exportSQL };
