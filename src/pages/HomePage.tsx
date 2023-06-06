import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/users.service';
import { logOut } from '../services/auth.service';
import { Context } from '../context';
import { User } from '../interfaces/users.interface';
import { Status } from '../constants';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { getUser, logout } = useContext(Context);
    const [users, setUsers] = useState<User[]>([]);
    const [status, setStatus] = useState(Status.Idle);
    const [logoutStatus, setLogoutStatus] = useState(Status.Idle);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setStatus(Status.Loading);
        getUsers().then(response => {
            setStatus(Status.Succeeded);
            setUsers(response.data.data);
        }).catch(error => {
            setStatus(Status.Failed);
            setMessage(error.message);
        });
    }, []);

    const handleLogout = () => {
        setLogoutStatus(Status.Loading);
        const user = getUser();
        user && logOut(user).then(logout)
            .then(() => {
                setLogoutStatus(Status.Succeeded);
            })
            .catch(() => {
                setLogoutStatus(Status.Failed);
            }).finally(() => {
                navigate('/login');
            });
    };

    const handleSelect = (row: any, isSelected: boolean, rowIndex: number) => {
        console.log('@@@', { row, isSelected, rowIndex });
    };

    const handleSelectAll = (isSelect: boolean, rows: any, e: React.SyntheticEvent<Element, Event>) => {
        console.log('@@@', { isSelect, rows, e });
    };

    const columns = [{
        dataField: 'id',
        text: 'Id'
    }, {
        dataField: 'name',
        text: 'Name'
    }, {
        dataField: 'email',
        text: 'Email'
    }, {
        dataField: 'registrationDate',
        text: 'Registration Date'
    }, {
        dataField: 'lastLoginDate',
        text: 'Last Login Date'
    }, {
        dataField: 'status',
        text: 'Status'
    }];

    return (
        <Container>
            <h1>Users</h1>
            <BootstrapTable
                bootstrap4
                keyField="id"
                data={users}
                columns={columns}
                caption={(
                    <Button
                        variant="danger"
                        onClick={handleLogout}
                        disabled={logoutStatus === Status.Loading || logoutStatus === Status.Succeeded}
                    >
                        {logoutStatus === Status.Loading ? <Spinner animation="border" size="sm" /> : 'Logout'}
                    </Button>
                )}
                selectRow={{
                    mode: 'checkbox',
                    clickToSelect: true,
                    onSelect: handleSelect,
                    onSelectAll: handleSelectAll
                }}
            />
        </Container>
    );
};

export default HomePage;
