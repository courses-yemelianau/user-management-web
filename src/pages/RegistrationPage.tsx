import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CreateUserDto } from '../dtos/users.dto';

const RegistrationPage = () => {
    const initialValues: CreateUserDto = {
        name: '',
        email: '',
        password: ''
    };
    const validationSchema = Yup.object<CreateUserDto>({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            // Handle registration logic here
            console.log(values);
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
                        isInvalid={!!touched.email && !!errors.email}
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
                        isInvalid={!!touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </Container>
    );
};

export default RegistrationPage;
