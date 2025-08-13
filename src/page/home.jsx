import React, { useState, useEffect} from 'react';
import ReactMarckdown from 'react-markdown';
import { Box, Paper, Typography } from '@mui/material';

import marckdownContent from '../../README.md?raw';

export default function Home() {
    const [marckdownContent, setMarckdownContent] = useState('');

    useEffect(() => {
        fetch('README.md')
            .then(response => response.text())
            .then(text => setMarckdownContent(text));
    }, []);

    return (
        <Box sx={{ padding: 2}}>
            <Paper elevation={3} sx={{ padding: 4}}>
                <Typography component={"div"}>
                    <ReactMarckdown>
                        {marckdownContent}
                    </ReactMarckdown>
                </Typography>
            </Paper>
        </Box>
    );
}