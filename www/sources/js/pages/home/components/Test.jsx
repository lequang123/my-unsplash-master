import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { Button, Form } from 'react-bootstrap';


export default class Test extends PureComponent {
    buildGridHeader2 = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={10}>Số</HeaderCell>
                <HeaderCell colWidth={10}>Số lần</HeaderCell>
            </HeaderRow >
        );
    };

    buildGridBody4 = () => {
        if (this.props.longNumber !== undefined && this.props.longNumber.length > 0) {
            let rows = [];
            const test = [...this.props.longNumber];
            const test1 = test.sort(function (a, b) { return b.count - a.count });
           // const test2 = test1.filter((v, i, a) => a.findIndex(v2 => (v2.arr === v.arr)) === i)

            //const testArr = this.getMaxValue(this.props.testArr);
            test1.map((data, index) => {
                rows.push(this.renderRow3(data, index));
            })
            return rows;
        }

        return [<Row key={`body${1}`} className="no-data"><Cell colSpan="3">không có dữ liệu</Cell></Row>];
    };

    getMaxValue = arr => {
        const arrayFiltered = [];
        arr.forEach(obj => {
            const item = arrayFiltered.find(thisItem => thisItem.arr === obj.arr);
            if (item) {
                if (item.count < obj.count) {
                    arrayFiltered.push(obj);
                }

                return;
            }
            arrayFiltered.push(obj);
        });
        return arrayFiltered;
    }


    renderRow3 = (item, index) => {
        return (
            <Row key={index}>
                <Cell className="text-center">{item.arr}</Cell>
                <Cell className="text-center">{item.count}</Cell>
            </Row>
        )
        return (

            longNumber !== undefined && longNumber.length > 0 && longNumber.slice(0, 20).map((item, index) => {
                console.log(`${item.arr}: ${item.count}`);
                return (
                    <Row key={index}>
                        <Cell className="text-center">{item.arr}</Cell>
                        <Cell className="text-center">{item.count}</Cell>
                    </Row>
                )
            })
        )
    };

    render() {
        return (
            <Table
                width={250}
                autoWidth={false}
                header={this.buildGridHeader2()}
                body={this.buildGridBody4()}
                isPaging={false}
                containerPadding={0}
                adjustedHeight={10}
            />
        );
    }
}

//const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

//const mapStateToProps = state => {
//    const { testArr } = state;
//    return { testArr };
//};

//export default connect(mapStateToProps, mapDispatchToProps)(Test);
