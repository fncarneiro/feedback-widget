import React, { useState } from 'react';
import { captureScreen } from 'react-native-view-shot';
import { ArrowLeft } from 'phosphor-react-native';
import {
    View,
    TextInput,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import * as fileSystem from 'expo-file-system';

import { styles } from './styles';
import { FeedbackType } from '../../components/Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { theme } from '../../theme';
import { ScreenshotButton } from '../../components/ScreenshotButton';
import { Button } from '../../components/Button';
import { api } from '../../libs/api';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [comment, setComment] = useState('');
    const [email, setEmail] = useState('');

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8,
        }).then(uri => {
            setScreenshot(uri);
        }).catch(err => {
            console.log(err);
        });
    }

    function handleScreenshotRemove() {
        setScreenshot(null);
    }

    async function handleSendFeedback() {

        if (isSendingFeedback) {
            return;
        }
        setIsSendingFeedback(true);

        const screenshotBase64 = screenshot && await fileSystem.readAsStringAsync(screenshot, { encoding: 'base64' });

        try {
            await api.post('/feedback', {
                type: feedbackType,
                comment: comment,
                email: email,
                screenshot: `data:image/png;base64,${screenshotBase64}`
            }).catch(err => {
                console.log(err);
                setComment(err);
            });

            onFeedbackSent();

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft
                        size={24}
                        weight="bold"
                        color={theme.colors.text_secondary}
                    />

                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Image
                        source={feedbackTypeInfo.image}
                        style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>

                </View>
            </View>
            <TextInput
                multiline
                style={styles.input}
                placeholder="Type your feedback here"
                placeholderTextColor={theme.colors.text_secondary}
                autoCorrect={false}
                onChangeText={setComment}
            />
            <TextInput
                style={styles.inputEmail}
                placeholder="Type your contact e-mail here"
                placeholderTextColor={theme.colors.text_secondary}
                autoCorrect={false}
                onChangeText={setEmail}
            />
            <View style={styles.footer}>
                <ScreenshotButton
                    onTakeShot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                    screenshot={screenshot}

                />
                <Button
                    onPress={handleSendFeedback}
                    isLoading={isSendingFeedback}

                />
            </View>

        </View>
    );
}