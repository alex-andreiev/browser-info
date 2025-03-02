import { LOCAL_IP_REGEX } from '../constants.js';

export function getLocalIp(elements) {
    const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    const pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel('');
    pc.onicecandidate = (event) => {
        if (event.candidate) {
            const ip = LOCAL_IP_REGEX.exec(event.candidate.candidate)[1];
            if (elements.localIp) {
                elements.localIp.textContent = ip;
            }
            pc.onicecandidate = null;
        }
    };
    pc.createOffer().then((offer) => pc.setLocalDescription(offer));
}
