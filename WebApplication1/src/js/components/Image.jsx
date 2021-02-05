import React, { Component } from 'react';
import {GET_ALL_IMAGES} from '../../../src/api/apiService';

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagesInfo : []
        };
    }

    async componentDidMount() {
        await GET_ALL_IMAGES(`image`)
        .then(res => this.setState({imagesInfo: res.data}));
    }

    // handleChange = event => {
    //     this.setState({
    //       file: URL.createObjectURL(event.target.files[0])
    //     })
    // }


    renderListImage = imagesInfo => {
        if (!imagesInfo.length) {
            return <h2 className="loading-img">Loading images...</h2>;
        }
        return (
                 imagesInfo.map((item, i) => 
                <div key={item.name} className="column">
                    <div className="wrap">
                        <img className={`Image${i}`}
                        src={`data:image/jpeg;base64,${item.data}`}
                        alt={`Image${i}`} 
                        />
                        <div className= {`imgHover-${item.name}`}>{item.name}</div>
                        <button className= {`btn-delete-${item.name}`}>delete</button>
                    </div>
                </div>
            )
        )
    }

    render() {
        const {imagesInfo} = this.state;
        return (
            <div className="image-container">
                <div className="row">
                    {this.renderListImage(imagesInfo)}
                </div>
            </div>
        );
    }
}

export default Image;