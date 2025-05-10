const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="h-16 w-16 border-4 border-gray-200 rounded-full border-t-primary animate-spin"></div>
        <div
          className="absolute inset-0 h-16 w-16 border-4 border-transparent rounded-full border-t-primary/30 animate-spin"
          style={{ animationDuration: '1.5s' }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
