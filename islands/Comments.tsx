import { User } from "@/routes/_middleware.tsx";
import { CommentsResponse } from "@/utils/comment.ts";
import { useEffect, useState } from "preact/hooks";
import LoadingSpinner from "@/components/LoadingSpinner.tsx";
import Card from "@/components/Card.tsx";
import LinkButton from "@/components/LinkButton.tsx";
import Avatar from "@/components/Avatar.tsx";

export interface CommentsProps {
  slug: string;
  user: User | null;
  defaultComments?: CommentsResponse | null;
}

export default function Comments(
  { slug, user, defaultComments = null }: CommentsProps,
) {
  const [comments, setComments] = useState<CommentsResponse | null>(
    defaultComments,
  );
  const [comment, setComment] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    if (defaultComments !== null) {
      return;
    }
    fetch(`/api/comments/${slug}`)
      .then((resp) => resp.json())
      .then((data) => setComments(data));
  }, [refresh]);

  return (
    <div class="py-4">
      <div class="flex flex-row items-center px-4 py-2">
        <h2 class="text-2xl font-bold">Comments</h2>
        <div class="mx-auto"></div>
        <LinkButton
          onClick={() => {
            setComments(null);
            setRefresh(!refresh);
          }}
        >
          Refresh
        </LinkButton>
      </div>
      {comments === null && (
        <div className="text-center">
          <LoadingSpinner />
        </div>
      )}
      {comments !== null && comments.comments.map((comment) => {
        const deleteBox = (
          <div class="ml-2">
            <LinkButton
              onClick={() => {
                fetch(`/api/comments/${slug}?id=${comment.id}`, {
                  method: "DELETE",
                }).then(() => {
                  setComments({
                    ...comments,
                    comments: comments.comments.filter((c) =>
                      c.id !== comment.id
                    ),
                  });
                });
              }}
            >
              Delete
            </LinkButton>
          </div>
        );
        return (
          <Card id={comment.id}>
            <div class="flex flex-row items-center px-4 py-2">
              {Avatar(comments.users[comment.creator])}
              <div class="mx-auto"></div>
              <div class="ml-2">
                <LinkButton
                  href={`/blog/${slug}#${comment.id}`}
                >
                  Permalink
                </LinkButton>
              </div>
              {user?.login !== "Twi" && user?.id == comment.creator &&
                deleteBox}
              {user?.login == "Twi" && deleteBox}
            </div>
            <p
              class="px-4 py-2 prose prose-slate"
              dangerouslySetInnerHTML={{ __html: comment.contentHTML }}
            >
            </p>
            <p class="px-4 py-2 text-gray-800">
              Written at {new Date(comment.createdAt).toLocaleString()}
            </p>
          </Card>
        );
      })}
      {user === null && (
        <div class="text-center">
          <a href="/auth/signin">Sign in with GitHub to comment</a>
        </div>
      )}
      {user !== null && (
        <Card>
          <div class="flex flex-row items-center px-4 py-2">
            {Avatar(user)}
          </div>
          <p class="px-4 py-2 text-gray-800">
            Comment as <strong>{user.name}</strong> (you can use markdown)
          </p>
          <textarea
            class="w-full px-4 py-2 text-gray-700"
            value={comment}
            onInput={(e) => setComment((e.target as HTMLTextAreaElement).value)}
          >
          </textarea>
          <LinkButton
            class="mb-2"
            onClick={() => {
              fetch(`/api/comments/${slug}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  content: comment,
                }),
              }).then((resp) => resp.json())
                .then((data) => {
                  setComments(data);
                  setComment("");
                });
            }}
          >
            Submit
          </LinkButton>
        </Card>
      )}
    </div>
  );
}
