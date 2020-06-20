import React, { Component, RefObject } from 'react';
import { Button, Image } from 'semantic-ui-react';
import { IAnimalPicture } from '../../../models/SmartFarm';
import Resizer from 'react-image-file-resizer';
import styles from './AddPicture.module.css'
import * as _ from 'lodash';
import SmartFarmApi from '../../../api/SmartFarmApi';
interface IProps {
  mode: 'view' | 'edit',
  pictureType: string,
  onSubmit?: (data:Array<IAnimalPicture>) => void;
}
interface IState {
  value: {
    pictures: Array<IAnimalPicture>
  }
}
class AddPicture extends Component<IProps, IState> {
  refsFileUpload: RefObject<any>;
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: { pictures: [] }
    }
    this.refsFileUpload = React.createRef();
    this.handleUploadFileChange = this.handleUploadFileChange.bind(this)
    this.getImage = this.getImage.bind(this)
    this.onDeletePicture = this.onDeletePicture.bind(this)
  }
  handleUploadFileChange(e) {
    _.forEach(e.target.files, (file) => {
      const fileName = file.name
      let value = this.state.value;
      Resizer.imageFileResizer(file, 500, 500, 'JPEG', 100, 0, uri => {
        const imgMeta = { fileName: fileName, data: uri, pictureType: this.props.pictureType }
        value.pictures.push(imgMeta)
        this.setState({ value: value });
      }, 'base64')
    })
  }
  onDeletePicture(e,data) {
    const delFile = data.data
    let value = this.state.value
    if (delFile.id) {
      SmartFarmApi.deleteAnimalPicture(delFile.id)
    }
    value.pictures = _.reduce(value.pictures, (result: any, valueItem) => {
      if (valueItem.fileName !== delFile.fileName || valueItem.id !== delFile.id) {
        result.push(valueItem)
      }
      return result
    }, []);
    this.setState({ value: value })
  }
  getImage() {
    if (this.props.onSubmit) {
      return this.props.onSubmit(this.state.value.pictures)
    }
    return this.state.value.pictures
  }
  render() {
    const { value } = this.state;
    const { mode } = this.props;
    return (
      <div style={{ padding: '10px 0' }}>
        <Button
          type="button"
          content="เลือกรูปภาพ"
          labelPosition="left"
          icon="upload"
          onClick={() => this.refsFileUpload.current.click()}
        />
        <input
          ref={this.refsFileUpload}
          name='picture'
          type="file"
          multiple
          hidden
          onChange={this.handleUploadFileChange}
        />
        <Image.Group size="medium" className={styles['text-center']}>
          {value.pictures.map((item,index) => {
            const showDeletePic = mode === 'edit' ?
              { as: 'a', color: 'red', corner: 'right', data: item, icon: 'window close', onClick: this.onDeletePicture } : null
            return <div key={item.id || index} className={styles['pic-div']}>
              <Image src={item.data} alt={item.id} rounded label={showDeletePic} />
            </div>
          })}
        </Image.Group>
      </div>
    );
  }
}

export default AddPicture;