import { ArrowLeft, Camera } from "phosphor-react"
import { FormEvent, useState } from "react";
import { feedbackTypes, feedbackType } from ".."
import { CloseButton } from "../../CloseButton"
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStep {
    feedbackType: feedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequested, onFeedbackSent }: FeedbackContentStep) {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState("");
    const [email, setEmail] = useState("");

    const feedbackTypeInfo = feedbackTypes[feedbackType]

    function handleSubmitFeedback(e: FormEvent) {
        e.preventDefault();
        console.log({
            comment,
            email,
            screenshot,
        })
        onFeedbackSent();
    }

    return (
        <>
            <header className="flex flex-col items-center">
                <button
                    type="button"
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={onFeedbackRestartRequested}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4" />

                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>

            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Describe your feedback"
                    onChange={(e) => setComment(e.target.value)}
                />
                <input
                    type="email"
                    className="flex w-full text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none"
                    placeholder="Contact e-mail"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}
                    />

                    <button
                        type="submit"
                        disabled={comment.length === 0}
                        className="p-2 bg-brand-500 border-transparent flex-1 flex justify-center items-center text-sm rounded-md hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-500"
                    >
                        Send feedback
                    </button>
                </footer>

            </form>
        </>
    )
}