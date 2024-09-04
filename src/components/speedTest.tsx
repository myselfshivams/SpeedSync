import React, { useState } from "react";
import { measureDownloadSpeed } from "../utils/speedTest";

const SpeedTest: React.FC = () => {
  const [speed, setSpeed] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const testFileUrls = [
    "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_2160p_30fps_normal.mp4",
    "http://ipv4.download.thinkbroadband.com/1GB.zip"
  ];
  
  const handleTestSpeed = async () => {
    setLoading(true);
    setError(null);
    try {
      const measuredSpeed = await measureDownloadSpeed(testFileUrls);
      setSpeed(measuredSpeed);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };
  

  return (
    <div>
      <h1>Internet Speed Test</h1>
      <button onClick={handleTestSpeed} disabled={loading}>
        {loading ? "Testing..." : "Start Test"}
      </button>
      {speed !== null && <p>Download Speed: {speed.toFixed(2)} Mbps</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default SpeedTest;
