import Blog from '../models/blog.model.js'
import uploadImageToCloudinary from '../helpers/cloudinary.helper.js'

const createBlogController = async (req, res) => {
    try {
        const { title, caption, description, categories, tags } = req.body;
        if (!title || !caption || !description) {
            return res.status(400).json({ message: 'Some required fields are missing' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No image provided' });
        }
        const cloudinaryResponse = await uploadImageToCloudinary(req.file.buffer);
        if (!cloudinaryResponse || !cloudinaryResponse?.secure_url) {
            return res.status(500).json({ message: 'Failed to upload image to cloudinary' });
        }

        const newBlog = await Blog.create({
            title,
            caption,
            description,
            categories,
            tags,
            image: cloudinaryResponse?.secure_url,
            createdBy: req.user._id
        });

        if (!newBlog) {
            return res.status(500).json({ message: 'Failed to create blog' });
        }
        req.user.blogs.unshift(newBlog._id);
        await req.user();
        res.status(201).json({message: 'Blog has been created.', newBlog});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default createBlogController;
/*
Hirrd is a free job portal web application. It offers a lot of services that are mind blowing. We offer you complete convenience. User can register as a candidate, who is there is seek jobs, or as a recruiter, who is there to recruit such candidates that prove beneficial for their company.
Hirrd is a free job portal web application. It offers a lot of services that are mind blowing. We offer you complete convenience. User can register as a candidate, who is there is seek jobs, or as a recruiter, who is there to recruit such candidates that prove beneficial for their company. If user is a candidate, he can save a job, apply for a job, and can view the growth of his applications that he submitted.
But if he is a recruiter, he can create a job, and handle the applications (cancel or accept) that are submitted for the job hiring.

jobs, job seeking, job hiring, internship, startup, tech jobs, web jobs, frontend jobs, backend jobs, developer jobs

#jobs #jobseeking #jobhiring #internship #startup #techjobs #webjobs #frontendjobs #backendjobs #developerjobs
*/