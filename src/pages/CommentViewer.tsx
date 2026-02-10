import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button.tsx';
import { Trash } from 'lucide-react';
import ToggleMode from '@/components/ThemeModeButton.tsx';
import { ArrowLeftIcon } from 'lucide-react';


export function CommentViewer(){

    interface CommentDetailsProps{
        content: string,
        username: string,
        date: Date,
        id: string,
    }

    const [commentDetails, setCommentDetails] = useState<CommentDetailsProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();
    const { blogID, commentID } = useParams();

    const API = `http://localhost:8080/author/dashboard/${blogID}/${commentID}`;
    const token = localStorage.getItem("token");
    

    async function DeleteCommentDetails(){
        try{
            const response = await fetch(API, {
                method: 'DELETE',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            if(!response.ok){
                throw new Error("Error")
            }

            const data = await response.json();

            if(data.commentID){
                navigate(`/dashboard/${data.blogID}`)
            }
            
        } catch (error){
            return error
        } finally{
            navigate(`/dashboard/${blogID}`);
        }  
    }

    useEffect(() => {

        let ignore = false;

        async function fetchIndividualBlogDetails(){
            try{
                const response = await fetch(API, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if (response.status === 401){
                    navigate("/")
                }

                const data = await response.json();

                const blogComment = data.comment


                if(!ignore){
                    setCommentDetails(array => [...array,
                        {content: blogComment.content,
                         date: blogComment.date,
                         id: blogComment.id,
                         username: blogComment.userUsername,
                        }
                    ])
                }

            } catch (error){
                return error
            } finally {
                setLoading(false);
            }
        }

        fetchIndividualBlogDetails();

        return () => {
            ignore = true
        }
    }, [API, token, navigate])


    return(
        <div >
            <div className="flex justify-evenly my-5">
                <Link className="inline-block" to="/dashboard">
                    <Button variant="outline">
                    <ArrowLeftIcon className="size-4" />
                    </Button>
                </Link>
                <ToggleMode />
            </div>


            <div className="flex flex-col items-center">

                <div className="hover:scale-105 max-w-md mx-auto bg-neutral-300 dark:bg-neutral-700 p-5 rounded-2xl my-5 transition">
                    <div className="flex justify-between">
                        <h1 className="font-semibold">{commentDetails[0].username}</h1>
                        <h1 className="font-semibold">{commentDetails[0].id}</h1>
                    </div>
                    <p>{commentDetails[0].content}</p>
                </div>

                <p className="text-2xl font-semibold">Press the button to delete the comment</p>
                <Button onClick={DeleteCommentDetails}>
                    <Trash />
                </Button>
            </div>
                
        </div>
    )
}