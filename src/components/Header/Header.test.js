import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test("avatar", () => {
    render(<Header />);
    const avatar = screen.getByRole('img');
    expect(avatar).toBeInTheDocument();
});

test("title", () => {
    render(<Header />);
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
    
});

test("logout", () => {
    render(<Header />);
   
    const logout = screen.getByTestId('logout');
    expect(logout).toBeInTheDocument();
});

