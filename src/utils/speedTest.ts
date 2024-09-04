export const measureDownloadSpeed = async (testFileUrls: string[]): Promise<number> => {
    let totalSpeed = 0;
    let successCount = 0;
  
    for (const url of testFileUrls) {
      const startTime = new Date().getTime();
  
      try {
        const response = await fetch(url, { cache: "no-cache" });
        if (!response.ok) {
          continue;
        }
  
        const endTime = new Date().getTime();
        const durationInSeconds = (endTime - startTime) / 1000;
  
        const contentLength = response.headers.get("content-length");
        if (!contentLength || durationInSeconds < 1) {
          continue;
        }
  
        const fileSizeInBytes = parseInt(contentLength, 10);
        const speedBps = (fileSizeInBytes * 8) / durationInSeconds;
        const speedMbps = speedBps / (1024 * 1024);
  
        totalSpeed += speedMbps;
        successCount += 1;
      } catch (error) {
        // Ignore errors for now
      }
    }
  
    if (successCount === 0) {
      throw new Error("Failed to measure download speed");
    }
  
    return totalSpeed / successCount;
  };
  