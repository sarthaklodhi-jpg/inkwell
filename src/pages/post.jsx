import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import Button from "../components/Button";
import Container from "../components/container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    // Use correct field name for user id (userid)
    const isAuthor = post && userData ? post.userid === userData.$id : false;
    //After the data loads (inside useEffect), setPost(post) updates the state, and the component re-renders. Now post is not null, and the check works as expected.

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletepost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };

    // Debug log to check post object and featuredimage
    let imageUrl = '';
    if (post && post.featuredimage) {
        imageUrl = appwriteService.getFileView(post.featuredimage);
        console.log('Post page post object:', post, 'imageUrl:', imageUrl);
    } else if (post) {
        console.log('Post page post object:', post, 'No featuredimage');
    }
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {post.featuredimage ? (
                        <img
                            src={imageUrl}
                            alt={post.title}
                            className="rounded-xl"
                        />
                    ) : (
                        <div className="rounded-xl bg-gray-300 w-full h-40 flex items-center justify-center text-gray-500">No Image</div>
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}