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

export class EditNotificationTemplate extends Component {
    static propTypes = {
        languages: PropTypes.arrayOf(PropTypes.object),
        notificationTypes: PropTypes.arrayOf(PropTypes.object),
        template: PropTypes.shape({
            notificationTemplateId: PropTypes.number,
            notificationTypeId: PropTypes.number,
            notificationTemplateName: PropTypes.string,
            title: PropTypes.string,
            contents: PropTypes.arrayOf(PropTypes.object)
        }).isRequired
    };

    static defaultProps = {
        languages: [],
        notificationTypes: [],
        template: {
            notificationTemplateId: 0,
            notificationTypeId: 0,
            notificationTemplateName: '',
            title: '',
            contents: []
        }
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
                        this.props.editTemplateResult &&
                        <ResponseMessage isSuccessful={this.props.editTemplateResult.isSuccessful}
                            message={this.props.editTemplateResult.message || LangHelper.getResource('EditNotificationTemplateSuccessfully')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" className="required" htmlFor="notificationTypeId">
                            {LangHelper.getResource('NotificationType')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="notificationTypeId" id="notificationTypeId"
                                isInvalid={touched.notificationTypeId && errors.notificationTypeId}
                                onChange={handleChange}
                                value={values.notificationTypeId}
                            >
                                <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {this.props.notificationTypes.map(renderNotificationTypeOption)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" className="required" htmlFor="notificationTemplateName">
                            {LangHelper.getResource('TemplateName')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control type="text" size="sm" value={values.notificationTemplateName}
                                className="shadow-none" autoComplete="off"
                                name="notificationTemplateName" id="notificationTemplateName"
                                isInvalid={touched.notificationTemplateName && errors.notificationTemplateName}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" className="required" htmlFor="title">
                            {LangHelper.getResource('Title')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control type="text" size="sm" value={values.title}
                                className="shadow-none" autoComplete="off"
                                name="title" id="title"
                                isInvalid={touched.title && errors.title}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    {
                        this.props.languages.map(item => {
                            return (
                                <Form.Group key={`language${item.settingId}`} as={Row}>
                                    <Form.Label column sm="4" md="3" className="required" htmlFor={'language_' + item.settingId}>
                                        {LangHelper.getResource('Content')} ({item.settingValue})
                                    </Form.Label>
                                    <Col sm="8" md="9">
                                        <Form.Control as="textarea" value={values['language_' + item.settingId]}
                                            className="shadow-none form-control"
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
                    <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
                        {LangHelper.getResource('Save')}
                    </Button>
                    <Button type="submit" variant="primary" size="sm" onClick={this.props.onClose}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const template = {
            notificationTemplateId: values.notificationTemplateId,
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
        this.props.editTemplate(template).then(() => {
            if (this.props.editTemplateResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    };

    render() {
        const template = this.props.template;
        const initialValues = {
            notificationTemplateId: template.notificationTemplateId,
            notificationTypeId: template.notificationTypeId,
            notificationTemplateName: template.notificationTemplateName,
            title: template.title
        };
        this.props.languages.map(item => {
            initialValues['language_' + item.settingId] = '';
            const index = template.contents.findIndex(x => x.languageId === item.settingId);
            if (index >= 0) {
                initialValues['language_' + item.settingId] = template.contents[index].content;
            }
        });

        return (
            <Modal show className="notification-template-modal" dialogAs={DraggableModalDialog}
                onHide={this.props.onClose}
                backdrop="static" keyboard={false} size="lg" centered
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('EditNotificationTemplate')}</Modal.Title>
                </Modal.Header>
                <Formik
                    validate={values => validateFormik(values, this.props.languages)}
                    onSubmit={this.handleSubmit}
                    initialValues={initialValues}
                >
                    {this.renderForm}
                </Formik>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { editTemplateResult, selectedTemplate, notificationTypes, languages } = state;
    return {
        editTemplateResult,
        template: selectedTemplate,
        notificationTypes,
        languages
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNotificationTemplate);