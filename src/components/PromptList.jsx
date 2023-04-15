const PromptList = (props) => {
  const { list } = props;
  
  return (
    <div className="promptList">
      {list.map((item, index) => {
        return (
          <div
            className={`PromptItem dnd-item type-word subType-${item.subType} disabled`}
            key={index}
          >
            <div className="content">
              <div className="displayName name">
                <span>{item.displayName}</span>
              </div>
              <div className="langName name">
                <span>{item.name}</span>
              </div>
            </div>
            <div className="dnd-slots">
              <div className="dnd-slot-pre"></div>
              <div className="dnd-slot-next"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PromptList;
