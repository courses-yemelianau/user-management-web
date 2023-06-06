import React, { useState } from 'react';
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CreateUserDto } from '../dtos/users.dto';
import { signUp } from '../services/auth.service';
import { Status } from '../constants';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [status, setStatus] = useState(Status.Idle);

    const initialValues: CreateUserDto = {
        name: '',
        email: '',
        password: ''
    };

    const validationSchema = Yup.object<CreateUserDto>({
        name: Yup
            .string()
            .required('Name is required'),
        email: Yup
            .string()
            .email('Invalid email address')
            .required('Email is required')
            .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address'),
        password: Yup
            .string()
            .required('Password is required')
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            setStatus(Status.Loading);
            setShowErrorMessage(false);
            signUp(values)
                .then(() => {
                    setStatus(Status.Succeeded);
                    setShowSuccessMessage(true);
                    setTimeout(() => {
                        setShowSuccessMessage(false);
                        navigate('/login');
                    }, 3000);
                })
                .catch((error) => {
                    setStatus(Status.Failed);
                    if (error.response && error.response.status === 409) {
                        setShowErrorMessage(true);
                        setErrorMessage(`This email ${values.email} already exists`);
                    } else {
                        setShowErrorMessage(true);
                        setErrorMessage('An error occurred. Please try again.');
                    }
                });
        }
    });

    const {
        handleSubmit,
        handleChange,
        values,
        touched,
        errors
    } = formik;

    return (
        <Container>
            <h1>Registration</h1>
            {showSuccessMessage && (
                <Alert variant="success" onClose={() => setShowSuccessMessage(false)} dismissible>
                    Registration successful! Redirecting to login page...
                </Alert>
            )}
            {showErrorMessage && (
                <Alert variant="danger" onClose={() => setShowErrorMessage(false)} dismissible>
                    {errorMessage}
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={!!touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <br />
                <Button
                    variant="primary"
                    type="submit"
                    disabled={status === Status.Loading || status === Status.Succeeded}
                >
                    {status === Status.Loading ? <Spinner animation="border" size="sm" /> : 'Register'}
                </Button>
                <br />
                <Alert variant="light" className="mt-3">
                    Already have an account? <Link to="/login">Login</Link>
                </Alert>
            </Form>
        </Container>
    );
};

export default RegistrationPage;
