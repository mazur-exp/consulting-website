export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div 
        className="absolute w-96 h-96 -top-20 -left-20 animate-float"
        style={{
          background: 'radial-gradient(closest-side, rgba(41, 194, 103, 0.28), transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      <div 
        className="absolute w-80 h-80 top-1/3 right-0 animate-float-delayed"
        style={{
          background: 'radial-gradient(closest-side, rgba(41, 194, 103, 0.28), transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      <div 
        className="absolute w-72 h-72 bottom-0 left-1/3 animate-float-delayed-2"
        style={{
          background: 'radial-gradient(closest-side, rgba(41, 194, 103, 0.28), transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
};
