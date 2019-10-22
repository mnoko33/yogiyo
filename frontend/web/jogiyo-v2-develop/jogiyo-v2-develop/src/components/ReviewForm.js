import React, { Component } from 'react';
import api from '../api';
import ImagePreview from './ImagePreview';

import './ReviewForm.scss';

// 아무 상태의 변화가 없으면 함수형 컴포넌트로 생성해보자!
// 근데 결국 점수의 변화를 담아 놓아야 하기 때문에... 클래스형으로 만들어야 한다.
class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      textCount: 0,
      body: '',
      tasteRate: 1,
      foodAmountRate: 1,
      deliveryRate: 1,

      // 이미지 업로드 관련

      files: [],
    };
  }

  componentDidMount() {
    const { body, tasteRate, foodAmountRate, deliveryRate } = this.props;

    if (body) {
      this.setState({
        textCount: body.length,
        tasteRate,
        foodAmountRate,
        deliveryRate,
      });
    }
  }

  handleTextCount(e) {
    const body = e.target.value;
    this.setState({
      textCount: body.length,
    });
  }

  handleFileChange(e) {
    e.persist();
    if (e.target.files) {
      this.setState(prevState => ({
        files: [...prevState.files, ...e.target.files],
      }));
    }
    console.log(this.state.files);
  }

  // async handleImgSubmit() {
  //   const { storeId } = this.props;
  //   const { files } = this.state;
  //   const formData = new FormData();

  //   files.forEach((f, index) => {
  //     formData.append(`file${index}`, f);
  //   });

  //   await api.post(`/restaurants/api/${storeId}/review/`, {
  //     review_images: formData,
  //   });
  // }
  // async handleSubmit() {
  //   // storeId를 프랍으로 받아와야 함
  //   const { storeId, history } = this.props;
  //   const { body, tasteRate, foodAmountRate, deliveryRate, files } = this.state;

  //   const formData = new FormData();
  //   formData.append('comment', body);
  //   formData.append('rating_taste', tasteRate);
  //   formData.append('rating_quantity', foodAmountRate);
  //   formData.append('rating_delivery', deliveryRate);
  //   files.forEach((f, index) => {
  //     formData.append('review_images', f);
  //   });
  //   // formData.append('review_images', files);
  //   // formData.append('review_images', 'djfadfjkasdjl');
  //   console.log(formData.get('comment'));
  //   console.log(formData.has('review_images'));
  //   console.log(files);
  //   console.log(formData.getAll('review_images'));

  //   await api.post(`/restaurants/api/${storeId}/review/`, formData);

  //   history.push(`/store/${storeId}`);
  // }

  handleTasteRateChange(e) {
    this.setState({
      tasteRate: parseInt(e.target.value),
    });
  }
  handleFoodAmountRateChange(e) {
    this.setState({
      foodAmountRate: parseInt(e.target.value),
    });
  }
  handleDeliveryRateChange(e) {
    this.setState({
      deliveryRate: parseInt(e.target.value),
    });
  }

  render() {
    const rating = [1, 2, 3, 4, 5];

    const {
      tasteRate,
      foodAmountRate,
      deliveryRate,

      files,
    } = this.state;
    console.log(files);

    return (
      <div className="ReviewForm">
        <form
          // encType="multipart/form-data"
          className="ReviewForm__form"
          onSubmit={e => {
            e.preventDefault();

            const body = e.target.elements.body.value;

            this.props.onSubmit(
              body,
              tasteRate,
              foodAmountRate,
              deliveryRate,
              files
            );
          }}
        >
          <div className="ReviewForm__form__rates">
            <div className="ReviewForm__form__rates__text">
              이 음식점에 대한 상세한 평가를 해주세요.
            </div>
            <div className="ReviewForm__form__rates__options">
              <span>맛</span>
              <select
                value={tasteRate}
                onChange={e => this.handleTasteRateChange(e)}
              >
                {rating.map((r, index) => (
                  <option value={r} key={index}>
                    {r}
                  </option>
                ))}
              </select>
              <span>양</span>
              <select
                value={foodAmountRate}
                onChange={e => this.handleFoodAmountRateChange(e)}
              >
                {rating.map((r, index) => (
                  <option value={r} key={index}>
                    {r}
                  </option>
                ))}
              </select>
              <span>배달</span>
              <select
                value={deliveryRate}
                onChange={e => this.handleDeliveryRateChange(e)}
              >
                {rating.map((r, index) => (
                  <option value={r} key={index}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <label htmlFor="reviewText" hidden>
            10자 이상의 리뷰를 남겨주세요.
          </label>
          <textarea
            className="ReviewForm__form__comments"
            onChange={e => {
              this.setState({
                body: e.target.value,
              });
              this.handleTextCount(e);
            }}
            id="reviewText"
            name="body"
            cols="30"
            rows="10"
            defaultValue={
              this.props.body // 수정 버튼이 눌렸을 때 받는 body 값. edit할 때 넘어와야 한다
            }
            placeholder="사진과 함께 리뷰 작성 시 최대 100포인트 적립 가능! 음식에 대한 솔직한 리뷰를 남겨주세요.(10자이상)"
            minLength="10"
            maxLength="300"
            required
          />
          <div className="ReviewForm__form__comments-count">
            {this.state.textCount} / 300
          </div>
          {/* 첨부할 이미지를 보여주는 섹션 */}
          <input
            hidden
            ref={this.inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={e => this.handleFileChange(e)}
          />
          <button
            className="ReviewForm__image-preview-btn"
            onClick={e => {
              e.preventDefault();
              this.inputRef.current.click();
            }}
          >
            이미지 선택
          </button>

          <div className="ReviewForm__image-preview">
            {files.map((f, index) => (
              <ImagePreview file={f} key={index} />
            ))}
          </div>
          <button className="ReviewForm__form__post-btn">등록 완료</button>
        </form>
      </div>
    );
  }
}

export default ReviewForm;
