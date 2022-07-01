﻿import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import { renderNotificationTypeOption, validateFormik } from '../common.functions';

export class NewNotificationTemplate extends Component {
    static propTypes = {
        languages: PropTypes.arrayOf(PropTypes.object),
        notificationTypes: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        languages: [],
        notificationTypes: []
    };

    constructor(props) {
        super(props);
    }

    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting
    }) => {
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        this.props.createTemplateResult &&
                        <ResponseMessage isSuccessful={this.props.createTemplateResult.isSuccessful}
                            message={this.props.createTemplateResult.message || LangHelper.getResource('InsertNotificationTemplateSuccessfully')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" className="required" htmlFor="notificationTypeId">
                            {LangHelper.getResource('NotificationType')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                isInvalid={touched.notificationTypeId && errors.notificationTypeId}
                                name="notificationTypeId" id="notificationTypeId"
                                value={values.notificationTypeId}
                                onChange={handleChange}
                            >
                                <option value="" hidden disabled>{LangHelper.getResource('PleaseSelect')}</option>
                                {this.props.notificationTypes.map(renderNotificationTypeOption)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3"
                            className="required" htmlFor="notificationTemplateName"
                        >
                            {LangHelper.getResource('TemplateName')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control type="text" size="sm" value={values.notificationTemplateName}
                                name="notificationTemplateName" id="notificationTemplateName"
                                className="shadow-none" autoComplete="off"
                                isInvalid={touched.notificationTemplateName && errors.notificationTemplateName}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3"
                            className="required" htmlFor="title"
                        >
                            {LangHelper.getResource('Title')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control type="text" size="sm" value={values.title}
                                name="title" id="title"
                                className="shadow-none" autoComplete="off"
                                isInvalid={touched.title && errors.title}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    {
                        this.props.languages.map(item => {
                            return (
                                <Form.Group key={`language${item.settingId}`} as={Row}>
                                    <Form.Label column sm="4" md="3"
                                        className="required" htmlFor={'language_' + item.settingId}
                                    >
                                        {LangHelper.getResource('Content')} ({item.settingValue})
                                    </Form.Label>
                                    <Col sm="8" md="9">
                                        <Form.Control as="textarea" className="shadow-none form-control"
                                            value={values['language_' + item.settingId]}
                                            name={'language_' + item.settingId} id={'language_' + item.settingId} rows="4"
                                            isInvalid={touched['language_' + item.settingId] && errors['language_' + item.settingId]}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            );
                        })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>{LangHelper.getResource('Save')}</Button>
                    <Button type="submit" variant="primary" size="sm" onClick={this.props.onClose}>{LangHelper.getResource('Cancel')}</Button>
                </Modal.Footer>
            </Form>
        );
    };

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const template = {
            notificationTypeId: values.notificationTypeId,
            notificationTemplateName: values.notificationTemplateName,
            title: values.title,
            contents: []
        };
        this.props.languages.map(item => {
            template.contents.push({
                languageId: item.settingId,
                content: values['language_' + item.settingId]
            });
        });

        this.props.createTemplate(template).then(() => {
            if (this.props.createTemplateResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    };

    render() {
        const initialValues = {
            notificationTypeId: '',
            notificationTemplateName: '',
            title: ''
        };
        this.props.languages.map(item => {
            initialValues['language_' + item.settingId] = '';
        });

        return (
            <Modal show className="notification-template-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="lg" centered
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('InsertNotificationTemplate')}</Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={initialValues}
                    validate={values => validateFormik(values, this.props.languages)}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { notificationTypes, languages, createTemplateResult } = state;
    return {
        notificationTypes,
        languages,
        createTemplateResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNotificationTemplate);