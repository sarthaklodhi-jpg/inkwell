import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import RTE from "../rte.jsx";
import Input from "../input.jsx";
import Button from "../Button";
import Select from "../select";
import appwriteService from "../../appwrite/config";


export default function PostForm({ post }) {
     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

       const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

     const submit = async (data) => {
        if (post) {
            let file = null;
            if (data.image && data.image[0]) {
                file = await appwriteService.uploadFile(data.image[0]);
                if (file && file.$id) {
                    appwriteService.deleteFile(post.featuredimage);
                } else if (data.image[0]) {
                    alert('Image upload failed. Please try again.');
                    return;
                }
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredimage: file && file.$id ? file.$id : post.featuredimage,
            });
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            let file = null;
            if (data.image && data.image[0]) {
                file = await appwriteService.uploadFile(data.image[0]);
            }
            if (file && file.$id) {
                data.featuredimage = file.$id;
                const dbPost = await appwriteService.createPost({ ...data, userid: userData.$id });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                alert('Image upload failed. Please select a valid image and try again.');
            }
        }

    };

      const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);                       
    
     React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
   
     return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && post.featuredimage ? (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFileView(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                ) : null}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}