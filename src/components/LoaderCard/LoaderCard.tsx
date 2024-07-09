import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const LoaderCard = () => {
    return (
        <SkeletonTheme baseColor="#4d4d4d" highlightColor="#f5f5f5">
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className='skeleton-loader'>
                    <Skeleton 
                        className='skeleton' 
                        height={300} 
                        width={200} 
                        highlightColor={ "#f5f5f5" } 
                        enableAnimation={true} 
                        style={{ backgroundColor:"#4d4d4d" }}
                    />
                    <Skeleton 
                        className='skeleton' 
                        height={12} 
                        highlightColor={ "#f5f5f5" } 
                        enableAnimation={true} 
                        style={{ backgroundColor:"#4d4d4d" }}
                    />
                </div>
            ))}
        </SkeletonTheme>
    );
};

export default LoaderCard;
