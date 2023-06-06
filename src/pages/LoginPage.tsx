import React, { useContext, useState } from 'react';
import { Form, Button, Container, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoginUserDto } from '../dtos/users.dto';
import { logIn } from '../services/auth.service';
import { Status } from '../constants';
import { Context } from '../context';

const LoginPage: React.FC = () => {
    const { login } = useContext(Context);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [status, setStatus] = useState(Status.Idle);

    const initialValues: LoginUserDto = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object<LoginUserDto>({
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
            setErrorMessage('');

            logIn(values)
                .then(({ data: { data } }) => {
                    setStatus(Status.Succeeded);
                    login(data.email);
                    navigate('/home');
                })
                .catch((error) => {
                    setStatus(Status.Failed);
                    if (error.response && error.response.status === 409) {
                        setErrorMessage('Invalid email or password');
                    } else {
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
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                {status === Status.Failed && (
                    <Alert variant="danger" onClose={() => setStatus(Status.Idle)} dismissible>
                        {errorMessage}
                    </Alert>
                )}
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
                    {status === Status.Loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                </Button>
                <br />
                <Alert variant="light" className="mt-3">
                    Don't have an account? <Link to="/register">Register</Link>
                </Alert>
            </Form>
        </Container>
    );
};

export default LoginPage;
