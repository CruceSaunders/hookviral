/**
 * Video Screenshot Capture Utility
 * 
 * Captures screenshots from video pages at 3 frames per second.
 * This is the workaround for not being able to directly watch/analyze videos.
 * 
 * Options for implementation:
 * 1. Puppeteer + headless Chrome (local/server)
 * 2. Browserless.io (cloud headless browser)
 * 3. Screenshotone.com API
 * 4. Video download + ffmpeg frame extraction
 */

export interface CaptureOptions {
  url: string;
  duration?: number; // seconds to capture, default 30
  fps?: number; // frames per second, default 3
  format?: "jpeg" | "png";
  quality?: number; // 0-100 for jpeg
  width?: number;
  height?: number;
}

export interface CaptureResult {
  success: boolean;
  screenshots: string[]; // base64 encoded images
  metadata?: {
    platform: string;
    videoId?: string;
    creator?: string;
    duration?: number;
  };
  error?: string;
}

/**
 * Main capture function - routes to appropriate method based on environment
 */
export async function captureVideoScreenshots(
  options: CaptureOptions
): Promise<CaptureResult> {
  const {
    url,
    duration = 30,
    fps = 3,
    format = "jpeg",
    quality = 80,
  } = options;

  // Determine which capture method to use based on available services
  
  // Option 1: Check for Browserless API key
  if (process.env.BROWSERLESS_API_KEY) {
    return await captureWithBrowserless(url, { duration, fps, format, quality });
  }

  // Option 2: Check for local Puppeteer availability
  if (process.env.ENABLE_LOCAL_CAPTURE === "true") {
    return await captureWithPuppeteer(url, { duration, fps, format, quality });
  }

  // Option 3: Return empty result with instructions
  return {
    success: false,
    screenshots: [],
    error: `Screenshot capture not configured. Set BROWSERLESS_API_KEY or ENABLE_LOCAL_CAPTURE=true.
    
Workaround: Ask users to:
1. Open the video on their phone
2. Take screenshots at key moments (hook, middle, end)
3. Upload the screenshots for analysis

Or use the "Describe Video" mode to generate replication guides without screenshots.`,
  };
}

/**
 * Capture using Browserless.io cloud service
 * https://www.browserless.io/
 */
async function captureWithBrowserless(
  url: string,
  options: { duration: number; fps: number; format: string; quality: number }
): Promise<CaptureResult> {
  const apiKey = process.env.BROWSERLESS_API_KEY;
  if (!apiKey) {
    return { success: false, screenshots: [], error: "No Browserless API key" };
  }

  const baseUrl = process.env.BROWSERLESS_URL || "https://chrome.browserless.io";
  
  try {
    // Browserless script to capture video screenshots
    const script = `
      const { duration, fps } = ${JSON.stringify(options)};
      const frameCount = duration * fps;
      const interval = 1000 / fps;
      const screenshots = [];

      // Navigate to page
      await page.goto('${url}', { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Wait for video to load
      await page.waitForSelector('video', { timeout: 10000 }).catch(() => {});
      
      // Try to play video
      await page.evaluate(() => {
        const video = document.querySelector('video');
        if (video) {
          video.muted = true;
          video.play();
        }
      });
      
      // Capture screenshots at intervals
      for (let i = 0; i < frameCount && i < 100; i++) {
        const screenshot = await page.screenshot({
          type: '${options.format}',
          quality: ${options.format === 'jpeg' ? options.quality : undefined},
          encoding: 'base64'
        });
        screenshots.push(screenshot);
        await new Promise(r => setTimeout(r, interval));
      }
      
      return { screenshots };
    `;

    const response = await fetch(`${baseUrl}/function?token=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: script,
        context: {},
      }),
    });

    if (!response.ok) {
      throw new Error(`Browserless error: ${response.status}`);
    }

    const result = await response.json();
    
    return {
      success: true,
      screenshots: result.screenshots || [],
      metadata: {
        platform: detectPlatform(url),
      },
    };
  } catch (error: any) {
    return {
      success: false,
      screenshots: [],
      error: error.message,
    };
  }
}

/**
 * Capture using local Puppeteer
 * Requires puppeteer to be installed: npm install puppeteer
 * 
 * This function is only called when ENABLE_LOCAL_CAPTURE=true,
 * so puppeteer should be installed in that case.
 */
async function captureWithPuppeteer(
  url: string,
  options: { duration: number; fps: number; format: string; quality: number }
): Promise<CaptureResult> {
  try {
    // Dynamic import to avoid requiring puppeteer when not used
    // @ts-ignore - puppeteer is an optional dependency
    const puppeteer = await import("puppeteer").catch(() => null);
    
    if (!puppeteer) {
      return {
        success: false,
        screenshots: [],
        error: "Puppeteer not installed. Run: npm install puppeteer",
      };
    }
    
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    
    // Set viewport to mobile size (typical for TikTok videos)
    await page.setViewport({ width: 414, height: 896 });
    
    // Navigate to video
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
    
    // Wait for video element
    await page.waitForSelector("video", { timeout: 10000 }).catch(() => {});
    
    // Mute and play video
    await page.evaluate(() => {
      const video = document.querySelector("video");
      if (video) {
        video.muted = true;
        video.play();
      }
    });

    const screenshots: string[] = [];
    const frameCount = options.duration * options.fps;
    const interval = 1000 / options.fps;

    // Capture frames
    for (let i = 0; i < frameCount && i < 100; i++) {
      const screenshot = await page.screenshot({
        type: options.format as "jpeg" | "png",
        quality: options.format === "jpeg" ? options.quality : undefined,
        encoding: "base64",
      });
      screenshots.push(screenshot.toString());
      await new Promise((r) => setTimeout(r, interval));
    }

    await browser.close();

    return {
      success: true,
      screenshots,
      metadata: {
        platform: detectPlatform(url),
      },
    };
  } catch (error: any) {
    return {
      success: false,
      screenshots: [],
      error: `Puppeteer error: ${error.message}`,
    };
  }
}

/**
 * Detect platform from URL
 */
function detectPlatform(url: string): string {
  const urlLower = url.toLowerCase();
  if (urlLower.includes("tiktok.com")) return "tiktok";
  if (urlLower.includes("instagram.com")) return "instagram";
  if (urlLower.includes("youtube.com")) return "youtube";
  if (urlLower.includes("twitter.com") || urlLower.includes("x.com")) return "twitter";
  return "unknown";
}

/**
 * Alternative: Video download + ffmpeg frame extraction
 * This is more reliable but requires more setup
 */
export async function captureWithVideoDownload(
  url: string,
  options: { duration: number; fps: number }
): Promise<CaptureResult> {
  // This would:
  // 1. Use a TikTok downloader API to get the raw video
  // 2. Use ffmpeg to extract frames at specified fps
  // 3. Return base64 encoded frames
  
  // Example ffmpeg command:
  // ffmpeg -i video.mp4 -vf fps=3 -t 30 frame_%04d.jpg
  
  return {
    success: false,
    screenshots: [],
    error: "Video download method not yet implemented",
  };
}

/**
 * Manual screenshot upload handling
 * Used when automated capture isn't available
 */
export function validateUploadedScreenshots(files: File[]): {
  valid: boolean;
  screenshots: string[];
  error?: string;
} {
  const maxFiles = 50;
  const maxSize = 5 * 1024 * 1024; // 5MB per file
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (files.length > maxFiles) {
    return {
      valid: false,
      screenshots: [],
      error: `Maximum ${maxFiles} screenshots allowed`,
    };
  }

  const invalidFiles = files.filter(
    (f) => !allowedTypes.includes(f.type) || f.size > maxSize
  );

  if (invalidFiles.length > 0) {
    return {
      valid: false,
      screenshots: [],
      error: "Some files are invalid. Use JPEG/PNG under 5MB each.",
    };
  }

  return { valid: true, screenshots: [] }; // Screenshots would be converted to base64 on client
}
