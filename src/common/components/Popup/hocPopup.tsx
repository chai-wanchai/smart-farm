import React from 'react';
import { Modal, Container } from 'semantic-ui-react';
export interface IPropPopup {
  title?: string,
  height?: string | number,
  width?: string | number,
  onClose?: () => any,
  onSubmit?: (data?: any) => any,
  onSelect?: (data?: any) => any,
  isOpen?: boolean,
  childProps?: any,
  [key: string]: any
}
interface IState {
  isOpen: boolean
}
const withPopupDialog = (WrappedComponent, moreProp?: any) => {
  class HOC extends React.Component<IPropPopup, IState> {
    constructor(props: IPropPopup) {
      super(props);
      this.state = {
        isOpen: false
      }
      this.openPopup = this.openPopup.bind(this)
      this.handlerClose = this.handlerClose.bind(this)
      this.handlePopup = this.handlePopup.bind(this)
    }
    public handlerClose(): void {
      if (this.props.onClose) {
        this.props.onClose()
      } else {
        this.setState({
          isOpen: false
        })
      }
    }
    public openPopup() {
      this.setState({ isOpen: true })
    }
    public handlePopup() {
      this.setState({ isOpen: !this.state.isOpen })
    }
    componentWillReceiveProps(nextProp: IPropPopup) {
      this.setState({ isOpen: nextProp.isOpen! })
    }

    render() {
      return (
        <React.Fragment>
          <Modal open={this.state.isOpen} onClose={this.handlePopup} closeIcon>
            <Modal.Header>{this.props.title}</Modal.Header>
            <Modal.Description>
              <Container>
                <div style={{ padding: '1rem' }}>
                  <WrappedComponent {...this.props} {...this.props.childProps} {...moreProp} onClose={this.handlerClose} />
                </div>
              </Container>
            </Modal.Description>
          </Modal>
        </React.Fragment>
      );
    }
  }
  return HOC;
}

export default withPopupDialog;