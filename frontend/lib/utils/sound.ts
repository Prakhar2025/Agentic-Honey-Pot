// Sound utility helpers

export function createNotificationSound(frequency: number, duration: number, volume = 0.1): void {
    try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioCtx.createOscillator()
        const gainNode = audioCtx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioCtx.destination)

        oscillator.frequency.value = frequency
        oscillator.type = 'sine'
        gainNode.gain.value = volume
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration / 1000)

        oscillator.start()
        oscillator.stop(audioCtx.currentTime + duration / 1000)
    } catch {
        // Audio API not available
    }
}

export const sounds = {
    messageReceived: () => createNotificationSound(800, 150),
    messageSent: () => createNotificationSound(600, 100),
    error: () => createNotificationSound(300, 200),
    alert: () => createNotificationSound(1000, 300),
    entityExtracted: () => createNotificationSound(900, 100, 0.05),
}
