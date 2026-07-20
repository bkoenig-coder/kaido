import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

const LottieComponent = (Lottie as any).default || Lottie;

interface LottieAnimationProps {
  url: string;
  width?: string;
  height?: string;
  fallback?: React.ReactNode;
}

export const LottieAnimation: React.FC<LottieAnimationProps> = ({ 
  url, 
  width = '100%', 
  height = '100%', 
  fallback 
}) => {
  const [animationData, setAnimationData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load animation');
        }
        return response.json();
      })
      .then(data => {
        if (isMounted) {
          setAnimationData(data);
        }
      })
      .catch(err => {
        console.error('Error fetching Lottie animation:', err);
        if (isMounted) {
          setError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  if (error) {
    return <>{fallback || null}</>;
  }

  if (!animationData) {
    return (
      <div className="lottie-loader-container" style={{ width, height }}>
        <div className="loader loader-sm"></div>
      </div>
    );
  }

  return (
    <div style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LottieComponent 
        animationData={animationData} 
        loop={true} 
        autoplay={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
