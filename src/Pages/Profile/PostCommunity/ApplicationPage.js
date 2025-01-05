import React, { useState } from 'react';
import { Button, TextField, Box, Typography, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../Auth/axiosInstance';

const ApplicationPage = () => {
    const { postId } = useParams();
    const [comment, setComment] = useState('');
    const [file, setFile] = useState(null);

    const handleCommentChange = (e) => setComment(e.target.value);
    const handleFileChange = (e) => setFile(e.target.files[0]);

    const submitComment = async () => {
        try {
            await axiosInstance.post(`/comment/${postId}`, { comment });
            setComment('');
        } catch (error) {
            console.error('Error submitting comment', error);
        }
    };

    const submitApplication = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axiosInstance.post(`/api/upload/${postId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Application submitted!');
        } catch (error) {
            console.error('Error submitting application', error);
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5" mb={2}>Post Application</Typography>

            <TextField
                label="Write a Comment"
                variant="outlined"
                fullWidth
                value={comment}
                onChange={handleCommentChange}
                sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={submitComment}>Submit Comment</Button>

            <Box sx={{ marginTop: 3 }}>
                <input type="file" onChange={handleFileChange} />
                <Button variant="contained" color="primary" onClick={submitApplication}>Apply Now</Button>
            </Box>
        </Box>
    );
};

export default ApplicationPage;
