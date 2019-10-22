import React, { Component } from 'react';

export default class ImagePreview extends Component {
  static defaultProps = {
    file: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      imageSrc: null,
    };
  }

  componentDidMount() {
    const { file } = this.props;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.setState({
        imageSrc: reader.result,
      });
    });
    reader.readAsDataURL(file);
  }
  render() {
    const { file } = this.state;
    const { imageSrc } = this.state;
    const alt = file ? file.name : '';
    return (
      <img
        src={imageSrc}
        style={{
          width: '100px',
        }}
        alt={alt}
      />
    );
  }
}
