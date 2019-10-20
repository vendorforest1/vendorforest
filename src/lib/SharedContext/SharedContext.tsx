import React from "react";

interface IContext {
  context: any;
}

const SharedContext = React.createContext({} as IContext);

export class ContextProvider extends React.Component<IContext> {
  render() {
    const { children, context } = this.props;
    return (
      <SharedContext.Provider
        value={{
          context: context,
        }}
      >
        {children}
      </SharedContext.Provider>
    );
  }
}

export const ContextConsumer = SharedContext.Consumer;
