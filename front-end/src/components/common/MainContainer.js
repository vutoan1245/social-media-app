const MainContainer = (props) => {
  return (
    <div className="flex flex-col lg:flex-row mt-20">
      <div className="w-full md:w-3/4 md:mx-auto lg:w-1/2 lg:mx-auto px-4">
        {props.children}
      </div>
    </div>
  );
};

export default MainContainer;
