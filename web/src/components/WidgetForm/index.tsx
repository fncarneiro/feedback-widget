import { useState } from "react";

import { CloseButton } from "../CloseButton";
import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
    BUG: {
        title: "Bug",
        image: {
            source: bugImageUrl,
            alt: 'Bug image'
        }
    },
    IDEA: {
        title: "Idea",
        image: {
            source: ideaImageUrl,
            alt: 'Lamp image'
        }
    },
    OTHER: {
        title: "Other",
        image: {
            source: thoughtImageUrl,
            alt: 'Thought balloon image'
        }
    },
}

export type feedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<feedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleRestartFeedback() {
        setFeedbackType(null);
        setFeedbackSent(false);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {
                feedbackSent ? (
                    <FeedbackSuccessStep onFeedbackRestartRequest={handleRestartFeedback} />
                ) : (
                    <>
                        {!feedbackType ? (
                            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                        ) : (
                            <FeedbackContentStep
                                feedbackType={feedbackType}
                                onFeedbackRestartRequested={handleRestartFeedback}
                                onFeedbackSent={() => setFeedbackSent(true)}
                            />
                        )}
                    </>
                )
            }

            <footer className="text-xs text-neutral-400 flex flex-col items-center">

                <p className="text-brand-500">We'll get back to you as soon as possible.</p>
                <p>Made with ♥ by    <a className='underline underline-offset-2' href="https://rocketseat.com.br">RocketSeat</a>
                </p>
            </footer>
        </div >
    );
}
