import React from 'react';
import { Button } from '@material-ui/core';

export default function ListItem({items}) {
    let list_items = []

    for (const item in items) {
        list_items.push(<li>{item}</li>);
    }

    return <ul>{list_items}</ul>
}