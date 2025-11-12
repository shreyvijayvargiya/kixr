import React, {
	useState,
	useRef,
	useCallback,
	useEffect,
	useMemo,
} from "react";
import {
	Copy,
	Maximize2,
	Plus,
	Trash2,
	X,
	ChevronDown,
	Download,
	Upload,
	Image as ImageIcon,
	Type,
	Video,
	MessageCircle,
	Sparkles,
	Send,
	Square,
	RectangleHorizontal,
	Triangle,
	Minus,
	Info,
	Wand2,
	Loader2,
	Globe,
	Camera,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";

// Gradient Presets - 20 presets with 2 color stops each
const gradientPresets = [
	{
		id: 1,
		name: "Sunset",
		type: "linear",
		angle: 45,
		stops: [
			{ id: 1, color: "#FF6B6B", position: { x: 0, y: 0 } },
			{ id: 2, color: "#FFE66D", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 2,
		name: "Ocean",
		type: "linear",
		angle: 135,
		stops: [
			{ id: 1, color: "#4ECDC4", position: { x: 0, y: 0 } },
			{ id: 2, color: "#44A08D", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 3,
		name: "Purple Dream",
		type: "linear",
		angle: 90,
		stops: [
			{ id: 1, color: "#667EEA", position: { x: 0, y: 0 } },
			{ id: 2, color: "#764BA2", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 4,
		name: "Forest",
		type: "linear",
		angle: 45,
		stops: [
			{ id: 1, color: "#11998E", position: { x: 0, y: 0 } },
			{ id: 2, color: "#38EF7D", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 5,
		name: "Coral",
		type: "linear",
		angle: 120,
		stops: [
			{ id: 1, color: "#FF9A9E", position: { x: 0, y: 0 } },
			{ id: 2, color: "#FECFEF", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 6,
		name: "Blue Sky",
		type: "linear",
		angle: 180,
		stops: [
			{ id: 1, color: "#3494E6", position: { x: 0, y: 0 } },
			{ id: 2, color: "#EC6EAD", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 7,
		name: "Peach",
		type: "linear",
		angle: 45,
		stops: [
			{ id: 1, color: "#FFECD2", position: { x: 0, y: 0 } },
			{ id: 2, color: "#FCB69F", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 8,
		name: "Midnight",
		type: "linear",
		angle: 135,
		stops: [
			{ id: 1, color: "#0F2027", position: { x: 0, y: 0 } },
			{ id: 2, color: "#203A43", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 9,
		name: "Rose Gold",
		type: "linear",
		angle: 90,
		stops: [
			{ id: 1, color: "#F093FB", position: { x: 0, y: 0 } },
			{ id: 2, color: "#F5576C", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 10,
		name: "Mint",
		type: "linear",
		angle: 45,
		stops: [
			{ id: 1, color: "#A8EDEA", position: { x: 0, y: 0 } },
			{ id: 2, color: "#FED6E3", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 11,
		name: "Fire",
		type: "linear",
		angle: 45,
		stops: [
			{ id: 1, color: "#FF416C", position: { x: 0, y: 0 } },
			{ id: 2, color: "#FF4B2B", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 12,
		name: "Lavender",
		type: "linear",
		angle: 135,
		stops: [
			{ id: 1, color: "#E0C3FC", position: { x: 0, y: 0 } },
			{ id: 2, color: "#8EC5FC", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 13,
		name: "zinc Tea",
		type: "linear",
		angle: 90,
		stops: [
			{ id: 1, color: "#D4FC79", position: { x: 0, y: 0 } },
			{ id: 2, color: "#96E6A1", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 14,
		name: "Cherry",
		type: "linear",
		angle: 45,
		stops: [
			{ id: 1, color: "#EB3349", position: { x: 0, y: 0 } },
			{ id: 2, color: "#F45C43", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 15,
		name: "Sky Blue",
		type: "linear",
		angle: 180,
		stops: [
			{ id: 1, color: "#89F7FE", position: { x: 0, y: 0 } },
			{ id: 2, color: "#66A6FF", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 16,
		name: "Orange",
		type: "linear",
		angle: 120,
		stops: [
			{ id: 1, color: "#FFB347", position: { x: 0, y: 0 } },
			{ id: 2, color: "#FFCC33", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 17,
		name: "Violet",
		type: "linear",
		angle: 135,
		stops: [
			{ id: 1, color: "#8360C3", position: { x: 0, y: 0 } },
			{ id: 2, color: "#2EBF91", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 18,
		name: "Pink",
		type: "linear",
		angle: 45,
		stops: [
			{ id: 1, color: "#FF6B95", position: { x: 0, y: 0 } },
			{ id: 2, color: "#FFC796", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 19,
		name: "Cyan",
		type: "linear",
		angle: 90,
		stops: [
			{ id: 1, color: "#00F5FF", position: { x: 0, y: 0 } },
			{ id: 2, color: "#00D4FF", position: { x: 100, y: 100 } },
		],
	},
	{
		id: 20,
		name: "Golden",
		type: "linear",
		angle: 45,
		stops: [
			{ id: 1, color: "#F6D365", position: { x: 0, y: 0 } },
			{ id: 2, color: "#FDA085", position: { x: 100, y: 100 } },
		],
	},
];

// Helper function to generate gradient CSS from preset
const generatePresetGradientCSS = (preset) => {
	if (preset.type === "linear") {
		return `linear-gradient(${preset.angle || 45}deg, ${preset.stops[0].color}, ${preset.stops[1].color})`;
	} else if (preset.type === "radial") {
		return `radial-gradient(circle, ${preset.stops[0].color}, ${preset.stops[1].color})`;
	} else if (preset.type === "conic") {
		return `conic-gradient(${preset.stops[0].color}, ${preset.stops[1].color})`;
	}
	return `linear-gradient(45deg, ${preset.stops[0].color}, ${preset.stops[1].color})`;
};

// Custom Dropdown Component
const Dropdown = ({
	value,
	onChange,
	options,
	placeholder,
	className = "",
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const handleClickOutside = useCallback((event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsOpen(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [handleClickOutside]);

	const selectedOption = options.find((option) => option.value === value);

	return (
		<div ref={dropdownRef} className={`relative ${className}`}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="w-full h-9 px-3 text-sm border border-zinc-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-zinc-400 transition-colors flex items-center justify-between"
			>
				<span className="text-left">
					{selectedOption?.label || placeholder}
				</span>
				<ChevronDown
					className={`w-4 h-4 transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.15 }}
						className="absolute z-50 w-full mt-1 bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden"
					>
						{options.map((option) => (
							<button
								key={option.value}
								type="button"
								onClick={() => {
									onChange(option.value);
									setIsOpen(false);
								}}
								className={`w-full px-3 py-2 text-sm text-left hover:bg-zinc-50 transition-colors ${
									value === option.value
										? "bg-zinc-100 text-zinc-900"
										: "text-zinc-700"
								}`}
							>
								{option.label}
							</button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const AnimatedGradientGenerator = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [gradient, setGradient] = useState({
		type: "linear",
		angle: 45,
		stops: [
			{ id: 1, color: "#FF8D00", position: { x: 0, y: 0 } },
			{ id: 2, color: "#FFB870", position: { x: 50, y: 30 } },
		],
		noise: {
			enabled: true,
			intensity: 0.3,
		},
		animation: {
			enabled: true,
			type: "rotate",
			duration: 3,
			easing: "ease-in-out",
			direction: "normal",
		},
		backgroundAnimation: {
			enabled: true,
			type: "slide",
			direction: "right",
			speed: 5,
			easing: "linear",
		},
		dimensions: {
			width: 1080,
			height: 1920,
		},
	});

	const [isPlaying, setIsPlaying] = useState(true);
	const [copied, setCopied] = useState("");
	const [selectedStop, setSelectedStop] = useState(null);
	const [isDragging, setIsDragging] = useState(false);
	const [downloadDimension, setDownloadDimension] = useState("mobile"); // mobile or desktop
	const [previewFrameSize, setPreviewFrameSize] = useState("mobile"); // mobile, tablet, desktop, etc.
	const [images, setImages] = useState([]);
	const [texts, setTexts] = useState([]);
	const [videos, setVideos] = useState([]);
	const [shapes, setShapes] = useState([]);
	const [selectedImage, setSelectedImage] = useState(null);
	const [selectedText, setSelectedText] = useState(null);
	const [selectedVideo, setSelectedVideo] = useState(null);
	const [selectedShape, setSelectedShape] = useState(null);
	const [imageResizing, setImageResizing] = useState(null);
	const [textResizing, setTextResizing] = useState(null);
	const [videoResizing, setVideoResizing] = useState(null);
	const [shapeResizing, setShapeResizing] = useState(null);
	const [isShapeDropdownOpen, setIsShapeDropdownOpen] = useState(false);
	const shapeDropdownRef = useRef(null);
	const [captionEditing, setCaptionEditing] = useState(null);
	const [textEditing, setTextEditing] = useState(null);
	const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);
	const [isGeneratingMP4, setIsGeneratingMP4] = useState(false);
	const [mp4Progress, setMp4Progress] = useState(0);
	const [isAIChatOpen, setIsAIChatOpen] = useState(false);
	const [aiMessages, setAiMessages] = useState([]);
	const [aiInput, setAiInput] = useState("");
	const [isAILoading, setIsAILoading] = useState(false);
	const [aiActionsEnabled, setAiActionsEnabled] = useState(true);
	const [aiMultiStepActions, setAiMultiStepActions] = useState([]);
	const [aiCurrentStep, setAiCurrentStep] = useState(0);
	const [aiCompletedSteps, setAiCompletedSteps] = useState(new Set());
	const [isExecutingSteps, setIsExecutingSteps] = useState(false);
	const [isKeyboardShortcutsOpen, setIsKeyboardShortcutsOpen] = useState(false);
	const keyboardShortcutsRef = useRef(null);
	const fileInputRef = useRef(null);
	const videoInputRef = useRef(null);
	const [isGradientPresetsOpen, setIsGradientPresetsOpen] = useState(false);
	const gradientPresetsRef = useRef(null);
	const imageReuploadRefs = useRef({});
	const videoReuploadRefs = useRef({});
	const previewRef = useRef(null);
	const modalPreviewRef = useRef(null);
	const downloadDropdownRef = useRef(null);
	const aiChatInputRef = useRef(null);
	const [isImageImprovementOpen, setIsImageImprovementOpen] = useState(false);
	const [improvementPrompt, setImprovementPrompt] = useState("");
	const [generatedImages, setGeneratedImages] = useState([]);
	const improvementPromptRef = useRef(null);
	const [isUrlScreenshotOpen, setIsUrlScreenshotOpen] = useState(false);
	const [urlInput, setUrlInput] = useState("");
	const [screenshotImage, setScreenshotImage] = useState(null);
	const [isScreenshotLoading, setIsScreenshotLoading] = useState(false);
	const urlInputRef = useRef(null);

	const dimensionPresets = {
		mobile: { width: 1080, height: 1920, label: "Mobile (1080×1920)" },
		desktop: { width: 1920, height: 1080, label: "Desktop (1920×1080)" },
	};

	const previewFramePresets = {
		mobile: { width: 1080, height: 1920, label: "Mobile", icon: "📱" },
		tablet: { width: 1024, height: 1366, label: "Tablet", icon: "📱" },
		desktop: { width: 1920, height: 1080, label: "Desktop", icon: "🖥️" },
		laptop: { width: 1366, height: 768, label: "Laptop", icon: "💻" },
		ultrawide: { width: 2560, height: 1080, label: "Ultrawide", icon: "🖥️" },
		custom: { width: 1080, height: 1080, label: "Square", icon: "⬜" },
	};

	// Image handling functions
	const handleImageUpload = (e) => {
		const files = Array.from(e.target.files);
		files.forEach((file) => {
			if (file.type.startsWith("image/")) {
				const reader = new FileReader();
				reader.onload = (event) => {
					const img = new Image();
					img.onload = () => {
						const maxWidth = 400;
						const maxHeight = 400;
						let width = img.width;
						let height = img.height;

						// Scale down if too large
						if (width > maxWidth || height > maxHeight) {
							const ratio = Math.min(maxWidth / width, maxHeight / height);
							width = width * ratio;
							height = height * ratio;
						}

						const newImage = {
							id: Date.now() + Math.random(),
							src: event.target.result,
							x: 50,
							y: 50,
							width,
							height,
							caption: "",
							styles: {
								objectFit: "contain", // contain, cover, fill, none, scale-down
								borderWidth: 0,
								borderColor: "#000000",
								borderStyle: "solid", // solid, dashed, dotted
								ringWidth: 0,
								ringColor: "#3b82f6",
								shadow: "none", // none, sm, md, lg, xl, 2xl
								borderRadius: 0,
								opacity: 1,
								zIndex: 1,
								noise: {
									enabled: false,
									intensity: 0.3,
								},
							},
						};
						setImages((prev) => [...prev, newImage]);
					};
					img.src = event.target.result;
				};
				reader.readAsDataURL(file);
			}
		});
		e.target.value = ""; // Reset input
	};

	const removeImage = (id) => {
		setImages((prev) => prev.filter((img) => img.id !== id));
		if (selectedImage === id) setSelectedImage(null);
	};

	const handleImageReupload = (e, imageId) => {
		const file = e.target.files[0];
		if (!file || !file.type.startsWith("image/")) return;

		const reader = new FileReader();
		reader.onload = (event) => {
			const img = new Image();
			img.onload = () => {
				const maxWidth = 400;
				const maxHeight = 400;
				let width = img.width;
				let height = img.height;

				// Scale down if too large
				if (width > maxWidth || height > maxHeight) {
					const ratio = Math.min(maxWidth / width, maxHeight / height);
					width = width * ratio;
					height = height * ratio;
				}

				// Update the image while keeping all other properties
				updateImage(imageId, {
					src: event.target.result,
					width,
					height,
				});
			};
			img.src = event.target.result;
		};
		reader.readAsDataURL(file);
		e.target.value = ""; // Reset input
	};

	const updateImage = (id, updates) => {
		setImages((prev) =>
			prev.map((img) => (img.id === id ? { ...img, ...updates } : img))
		);
	};

	const handleImageMouseDown = (e, imageId) => {
		e.stopPropagation();
		setSelectedImage(imageId);
		const image = images.find((img) => img.id === imageId);
		if (!image) return;

		const startX = e.clientX;
		const startY = e.clientY;
		const startImageX = image.x;
		const startImageY = image.y;

		const handleMouseMove = (e) => {
			const deltaX =
				((e.clientX - startX) / previewRef.current.offsetWidth) * 100;
			const deltaY =
				((e.clientY - startY) / previewRef.current.offsetHeight) * 100;

			const newX = Math.max(0, Math.min(100, startImageX + deltaX));
			const newY = Math.max(0, Math.min(100, startImageY + deltaY));

			updateImage(imageId, { x: newX, y: newY });
		};

		const handleMouseUp = () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	const handleResizeStart = (e, imageId, corner) => {
		e.stopPropagation();
		e.preventDefault();
		setImageResizing({ imageId, corner });
		const image = images.find((img) => img.id === imageId);
		if (!image || !previewRef.current) return;

		const previewRect = previewRef.current.getBoundingClientRect();
		const startX = e.clientX;
		const startY = e.clientY;
		const startWidth = image.width;
		const startHeight = image.height;
		const startImageX = image.x;
		const startImageY = image.y;

		// Calculate image position in pixels relative to preview
		const imageCenterX = (startImageX / 100) * previewRect.width;
		const imageCenterY = (startImageY / 100) * previewRect.height;
		const imageLeft = imageCenterX - startWidth / 2;
		const imageTop = imageCenterY - startHeight / 2;
		const imageRight = imageLeft + startWidth;
		const imageBottom = imageTop + startHeight;

		const handleMouseMove = (e) => {
			if (!previewRef.current) return;

			const deltaX = e.clientX - startX;
			const deltaY = e.clientY - startY;

			let newWidth = startWidth;
			let newHeight = startHeight;
			let newX = startImageX;
			let newY = startImageY;

			// Calculate new bounds based on corner/edge
			let newLeft = imageLeft;
			let newTop = imageTop;
			let newRight = imageRight;
			let newBottom = imageBottom;

			if (corner.includes("e")) {
				newRight = imageRight + deltaX;
				newRight = Math.max(
					imageLeft + 30,
					Math.min(previewRect.width, newRight)
				);
			}
			if (corner.includes("w")) {
				newLeft = imageLeft + deltaX;
				newLeft = Math.max(0, Math.min(imageRight - 30, newLeft));
			}
			if (corner.includes("s")) {
				newBottom = imageBottom + deltaY;
				newBottom = Math.max(
					imageTop + 30,
					Math.min(previewRect.height, newBottom)
				);
			}
			if (corner.includes("n")) {
				newTop = imageTop + deltaY;
				newTop = Math.max(0, Math.min(imageBottom - 30, newTop));
			}

			// Calculate new dimensions and position
			newWidth = newRight - newLeft;
			newHeight = newBottom - newTop;

			// Ensure minimum size
			if (newWidth < 30) {
				newWidth = 30;
				if (corner.includes("w")) {
					newLeft = newRight - 30;
				} else {
					newRight = newLeft + 30;
				}
			}
			if (newHeight < 30) {
				newHeight = 30;
				if (corner.includes("n")) {
					newTop = newBottom - 30;
				} else {
					newBottom = newTop + 30;
				}
			}

			// Calculate center position in percentage
			const centerX = ((newLeft + newWidth / 2) / previewRect.width) * 100;
			const centerY = ((newTop + newHeight / 2) / previewRect.height) * 100;

			// Constrain to canvas bounds
			newX = Math.max(0, Math.min(100, centerX));
			newY = Math.max(0, Math.min(100, centerY));

			updateImage(imageId, {
				width: newWidth,
				height: newHeight,
				x: newX,
				y: newY,
			});
		};

		const handleMouseUp = () => {
			setImageResizing(null);
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	const toggleCaption = (imageId) => {
		setCaptionEditing(captionEditing === imageId ? null : imageId);
	};

	const toggleObjectFit = (imageId) => {
		const image = images.find((img) => img.id === imageId);
		if (!image) return;

		const objectFitOptions = ["contain", "cover", "fill", "none", "scale-down"];
		const currentIndex = objectFitOptions.indexOf(
			image.styles?.objectFit || "contain"
		);
		const nextIndex = (currentIndex + 1) % objectFitOptions.length;

		updateImage(imageId, {
			styles: {
				...image.styles,
				objectFit: objectFitOptions[nextIndex],
			},
		});
	};

	// Video handling functions
	const handleVideoUpload = (e) => {
		const files = Array.from(e.target.files);
		files.forEach((file) => {
			if (file.type.startsWith("video/")) {
				const reader = new FileReader();
				reader.onload = (event) => {
					const video = document.createElement("video");
					video.preload = "metadata";
					video.onloadedmetadata = () => {
						const maxWidth = 400;
						const maxHeight = 400;
						let width = video.videoWidth;
						let height = video.videoHeight;

						// Scale down if too large
						if (width > maxWidth || height > maxHeight) {
							const ratio = Math.min(maxWidth / width, maxHeight / height);
							width = width * ratio;
							height = height * ratio;
						}

						const newVideo = {
							id: Date.now() + Math.random(),
							src: event.target.result,
							x: 50,
							y: 50,
							width,
							height,
							caption: "",
							styles: {
								objectFit: "contain",
								borderWidth: 0,
								borderColor: "#000000",
								borderStyle: "solid",
								ringWidth: 0,
								ringColor: "#3b82f6",
								shadow: "none",
								borderRadius: 0,
								opacity: 1,
								zIndex: 1,
							},
						};
						setVideos((prev) => [...prev, newVideo]);
					};
					video.src = event.target.result;
				};
				reader.readAsDataURL(file);
			}
		});
		e.target.value = ""; // Reset input
	};

	const removeVideo = (id) => {
		setVideos((prev) => prev.filter((vid) => vid.id !== id));
		if (selectedVideo === id) setSelectedVideo(null);
	};

	const handleVideoReupload = (e, videoId) => {
		const file = e.target.files[0];
		if (!file || !file.type.startsWith("video/")) return;

		const reader = new FileReader();
		reader.onload = (event) => {
			const video = document.createElement("video");
			video.preload = "metadata";
			video.onloadedmetadata = () => {
				const maxWidth = 400;
				const maxHeight = 400;
				let width = video.videoWidth;
				let height = video.videoHeight;

				// Scale down if too large
				if (width > maxWidth || height > maxHeight) {
					const ratio = Math.min(maxWidth / width, maxHeight / height);
					width = width * ratio;
					height = height * ratio;
				}

				// Update the video while keeping all other properties
				updateVideo(videoId, {
					src: event.target.result,
					width,
					height,
				});
			};
			video.src = event.target.result;
		};
		reader.readAsDataURL(file);
		e.target.value = ""; // Reset input
	};

	const updateVideo = (id, updates) => {
		setVideos((prev) =>
			prev.map((vid) => (vid.id === id ? { ...vid, ...updates } : vid))
		);
	};

	const handleVideoMouseDown = (e, videoId) => {
		e.stopPropagation();
		setSelectedVideo(videoId);
		const video = videos.find((vid) => vid.id === videoId);
		if (!video) return;

		const startX = e.clientX;
		const startY = e.clientY;
		const startVideoX = video.x;
		const startVideoY = video.y;

		const handleMouseMove = (e) => {
			const deltaX =
				((e.clientX - startX) / previewRef.current.offsetWidth) * 100;
			const deltaY =
				((e.clientY - startY) / previewRef.current.offsetHeight) * 100;

			const newX = Math.max(0, Math.min(100, startVideoX + deltaX));
			const newY = Math.max(0, Math.min(100, startVideoY + deltaY));

			updateVideo(videoId, { x: newX, y: newY });
		};

		const handleMouseUp = () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	const handleVideoResizeStart = (e, videoId, corner) => {
		e.stopPropagation();
		e.preventDefault();
		setVideoResizing({ videoId, corner });
		const video = videos.find((vid) => vid.id === videoId);
		if (!video || !previewRef.current) return;

		const previewRect = previewRef.current.getBoundingClientRect();
		const startX = e.clientX;
		const startY = e.clientY;
		const startWidth = video.width;
		const startHeight = video.height;
		const startVideoX = video.x;
		const startVideoY = video.y;

		const videoCenterX = (startVideoX / 100) * previewRect.width;
		const videoCenterY = (startVideoY / 100) * previewRect.height;
		const videoLeft = videoCenterX - startWidth / 2;
		const videoTop = videoCenterY - startHeight / 2;
		const videoRight = videoLeft + startWidth;
		const videoBottom = videoTop + startHeight;

		const handleMouseMove = (e) => {
			if (!previewRef.current) return;

			const deltaX = e.clientX - startX;
			const deltaY = e.clientY - startY;

			let newWidth = startWidth;
			let newHeight = startHeight;
			let newX = startVideoX;
			let newY = startVideoY;

			let newLeft = videoLeft;
			let newTop = videoTop;
			let newRight = videoRight;
			let newBottom = videoBottom;

			if (corner.includes("e")) {
				newRight = videoRight + deltaX;
				newRight = Math.max(
					videoLeft + 30,
					Math.min(previewRect.width, newRight)
				);
			}
			if (corner.includes("w")) {
				newLeft = videoLeft + deltaX;
				newLeft = Math.max(0, Math.min(videoRight - 30, newLeft));
			}
			if (corner.includes("s")) {
				newBottom = videoBottom + deltaY;
				newBottom = Math.max(
					videoTop + 30,
					Math.min(previewRect.height, newBottom)
				);
			}
			if (corner.includes("n")) {
				newTop = videoTop + deltaY;
				newTop = Math.max(0, Math.min(videoBottom - 30, newTop));
			}

			newWidth = newRight - newLeft;
			newHeight = newBottom - newTop;

			if (newWidth < 30) {
				newWidth = 30;
				if (corner.includes("w")) {
					newLeft = newRight - 30;
				} else {
					newRight = newLeft + 30;
				}
			}
			if (newHeight < 30) {
				newHeight = 30;
				if (corner.includes("n")) {
					newTop = newBottom - 30;
				} else {
					newBottom = newTop + 30;
				}
			}

			const centerX = ((newLeft + newWidth / 2) / previewRect.width) * 100;
			const centerY = ((newTop + newHeight / 2) / previewRect.height) * 100;

			newX = Math.max(0, Math.min(100, centerX));
			newY = Math.max(0, Math.min(100, centerY));

			updateVideo(videoId, {
				width: newWidth,
				height: newHeight,
				x: newX,
				y: newY,
			});
		};

		const handleMouseUp = () => {
			setVideoResizing(null);
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	const toggleVideoCaption = (videoId) => {
		setCaptionEditing(captionEditing === videoId ? null : videoId);
	};

	const toggleVideoObjectFit = (videoId) => {
		const video = videos.find((vid) => vid.id === videoId);
		if (!video) return;

		const objectFitOptions = ["contain", "cover", "fill", "none", "scale-down"];
		const currentIndex = objectFitOptions.indexOf(
			video.styles?.objectFit || "contain"
		);
		const nextIndex = (currentIndex + 1) % objectFitOptions.length;

		updateVideo(videoId, {
			styles: {
				...video.styles,
				objectFit: objectFitOptions[nextIndex],
			},
		});
	};

	// Shape handling functions
	const addShape = (shapeType) => {
		const newShape = {
			id: Date.now() + Math.random(),
			type: shapeType, // "rectangle", "square", "line", "triangle"
			x: 50,
			y: 50,
			width: shapeType === "line" ? 200 : shapeType === "square" ? 150 : 200,
			height: shapeType === "line" ? 2 : shapeType === "square" ? 150 : 150,
			styles: {
				fillColor: "#3b82f6",
				strokeColor: "#1e40af",
				strokeWidth: 2,
				opacity: 1,
				borderRadius: 0,
				shadow: "none",
				zIndex: 1,
			},
		};
		setShapes((prev) => [...prev, newShape]);
		setSelectedShape(newShape.id);
		setIsShapeDropdownOpen(false);
	};

	const removeShape = (id) => {
		setShapes((prev) => prev.filter((shape) => shape.id !== id));
		if (selectedShape === id) setSelectedShape(null);
	};

	const updateShape = (id, updates) => {
		setShapes((prev) =>
			prev.map((shape) => (shape.id === id ? { ...shape, ...updates } : shape))
		);
	};

	const handleShapeMouseDown = (e, shapeId) => {
		e.stopPropagation();
		setSelectedShape(shapeId);
		const shape = shapes.find((s) => s.id === shapeId);
		if (!shape) return;

		const startX = e.clientX;
		const startY = e.clientY;
		const startShapeX = shape.x;
		const startShapeY = shape.y;

		const handleMouseMove = (e) => {
			const deltaX =
				((e.clientX - startX) / previewRef.current.offsetWidth) * 100;
			const deltaY =
				((e.clientY - startY) / previewRef.current.offsetHeight) * 100;

			const newX = Math.max(0, Math.min(100, startShapeX + deltaX));
			const newY = Math.max(0, Math.min(100, startShapeY + deltaY));

			updateShape(shapeId, { x: newX, y: newY });
		};

		const handleMouseUp = () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	const handleShapeResizeStart = (e, shapeId, corner) => {
		e.stopPropagation();
		e.preventDefault();
		setShapeResizing({ shapeId, corner });
		const shape = shapes.find((s) => s.id === shapeId);
		if (!shape || !previewRef.current) return;

		const previewRect = previewRef.current.getBoundingClientRect();
		const startX = e.clientX;
		const startY = e.clientY;
		const startWidth = shape.width;
		const startHeight = shape.height;
		const startShapeX = shape.x;
		const startShapeY = shape.y;

		const shapeCenterX = (startShapeX / 100) * previewRect.width;
		const shapeCenterY = (startShapeY / 100) * previewRect.height;
		const shapeLeft = shapeCenterX - startWidth / 2;
		const shapeTop = shapeCenterY - startHeight / 2;
		const shapeRight = shapeLeft + startWidth;
		const shapeBottom = shapeTop + startHeight;

		const handleMouseMove = (e) => {
			if (!previewRef.current) return;

			const deltaX = e.clientX - startX;
			const deltaY = e.clientY - startY;

			let newWidth = startWidth;
			let newHeight = startHeight;
			let newX = startShapeX;
			let newY = startShapeY;

			let newLeft = shapeLeft;
			let newTop = shapeTop;
			let newRight = shapeRight;
			let newBottom = shapeBottom;

			if (corner.includes("e")) {
				newRight = shapeRight + deltaX;
				newRight = Math.max(
					shapeLeft + 20,
					Math.min(previewRect.width, newRight)
				);
			}
			if (corner.includes("w")) {
				newLeft = shapeLeft + deltaX;
				newLeft = Math.max(0, Math.min(shapeRight - 20, newLeft));
			}
			if (corner.includes("s")) {
				newBottom = shapeBottom + deltaY;
				newBottom = Math.max(
					shapeTop + 20,
					Math.min(previewRect.height, newBottom)
				);
			}
			if (corner.includes("n")) {
				newTop = shapeTop + deltaY;
				newTop = Math.max(0, Math.min(shapeBottom - 20, newTop));
			}

			newWidth = newRight - newLeft;
			newHeight = newBottom - newTop;

			// Ensure minimum size
			if (newWidth < 20) {
				newWidth = 20;
				if (corner.includes("w")) {
					newLeft = newRight - 20;
				} else {
					newRight = newLeft + 20;
				}
			}
			if (newHeight < 20) {
				newHeight = 20;
				if (corner.includes("n")) {
					newTop = newBottom - 20;
				} else {
					newBottom = newTop + 20;
				}
			}

			// For squares, maintain aspect ratio
			if (shape.type === "square") {
				const size = Math.max(newWidth, newHeight);
				newWidth = size;
				newHeight = size;
			}

			// Calculate center position in percentage
			const centerX = ((newLeft + newWidth / 2) / previewRect.width) * 100;
			const centerY = ((newTop + newHeight / 2) / previewRect.height) * 100;

			newX = Math.max(0, Math.min(100, centerX));
			newY = Math.max(0, Math.min(100, centerY));

			updateShape(shapeId, {
				width: newWidth,
				height: newHeight,
				x: newX,
				y: newY,
			});
		};

		const handleMouseUp = () => {
			setShapeResizing(null);
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	// Handle click outside shape dropdown
	const handleShapeDropdownClickOutside = useCallback((event) => {
		if (
			shapeDropdownRef.current &&
			!shapeDropdownRef.current.contains(event.target)
		) {
			setIsShapeDropdownOpen(false);
		}
	}, []);

	useEffect(() => {
		if (isShapeDropdownOpen) {
			document.addEventListener("mousedown", handleShapeDropdownClickOutside);
			return () =>
				document.removeEventListener(
					"mousedown",
					handleShapeDropdownClickOutside
				);
		}
	}, [isShapeDropdownOpen, handleShapeDropdownClickOutside]);

	// Handle click outside gradient presets dropdown
	const handleGradientPresetsClickOutside = useCallback((event) => {
		if (
			gradientPresetsRef.current &&
			!gradientPresetsRef.current.contains(event.target)
		) {
			setIsGradientPresetsOpen(false);
		}
	}, []);

	useEffect(() => {
		if (isGradientPresetsOpen) {
			document.addEventListener("mousedown", handleGradientPresetsClickOutside);
			return () =>
				document.removeEventListener(
					"mousedown",
					handleGradientPresetsClickOutside
				);
		}
	}, [isGradientPresetsOpen, handleGradientPresetsClickOutside]);

	// Text handling functions
	const addText = () => {
		const newText = {
			id: Date.now() + Math.random(),
			content: "New Text",
			x: 50,
			y: 50,
			width: 200,
			height: 50,
			styles: {
				fontSize: 24,
				fontWeight: "normal", // normal, bold
				fontStyle: "normal", // normal, italic
				color: "#000000",
				textAlign: "left", // left, center, right
				fontFamily: "Arial",
				backgroundColor: "transparent",
				padding: 0,
				borderRadius: 0,
				borderWidth: 0,
				borderColor: "#000000",
				borderStyle: "solid",
				shadow: "none",
				opacity: 1,
				zIndex: 2,
			},
		};
		setTexts((prev) => [...prev, newText]);
		setSelectedText(newText.id);
		setTextEditing(newText.id);
	};

	const removeText = (id) => {
		setTexts((prev) => prev.filter((txt) => txt.id !== id));
		if (selectedText === id) setSelectedText(null);
	};

	const updateText = (id, updates) => {
		setTexts((prev) =>
			prev.map((txt) => (txt.id === id ? { ...txt, ...updates } : txt))
		);
	};

	const handleTextMouseDown = (e, textId) => {
		e.stopPropagation();
		setSelectedText(textId);
		if (textEditing === textId) return; // Don't drag while editing

		const text = texts.find((txt) => txt.id === textId);
		if (!text) return;

		const startX = e.clientX;
		const startY = e.clientY;
		const startTextX = text.x;
		const startTextY = text.y;

		const handleMouseMove = (e) => {
			const deltaX =
				((e.clientX - startX) / previewRef.current.offsetWidth) * 100;
			const deltaY =
				((e.clientY - startY) / previewRef.current.offsetHeight) * 100;

			const newX = Math.max(0, Math.min(100, startTextX + deltaX));
			const newY = Math.max(0, Math.min(100, startTextY + deltaY));

			updateText(textId, { x: newX, y: newY });
		};

		const handleMouseUp = () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	const handleTextResizeStart = (e, textId, corner) => {
		e.stopPropagation();
		e.preventDefault();
		setTextResizing({ textId, corner });
		const text = texts.find((txt) => txt.id === textId);
		if (!text || !previewRef.current) return;

		const previewRect = previewRef.current.getBoundingClientRect();
		const startX = e.clientX;
		const startY = e.clientY;
		const startWidth = text.width;
		const startHeight = text.height;
		const startTextX = text.x;
		const startTextY = text.y;

		const textCenterX = (startTextX / 100) * previewRect.width;
		const textCenterY = (startTextY / 100) * previewRect.height;
		const textLeft = textCenterX - startWidth / 2;
		const textTop = textCenterY - startHeight / 2;
		const textRight = textLeft + startWidth;
		const textBottom = textTop + startHeight;

		const handleMouseMove = (e) => {
			if (!previewRef.current) return;

			const deltaX = e.clientX - startX;
			const deltaY = e.clientY - startY;

			let newWidth = startWidth;
			let newHeight = startHeight;
			let newX = startTextX;
			let newY = startTextY;

			let newLeft = textLeft;
			let newTop = textTop;
			let newRight = textRight;
			let newBottom = textBottom;

			if (corner.includes("e")) {
				newRight = textRight + deltaX;
				newRight = Math.max(
					textLeft + 50,
					Math.min(previewRect.width, newRight)
				);
			}
			if (corner.includes("w")) {
				newLeft = textLeft + deltaX;
				newLeft = Math.max(0, Math.min(textRight - 50, newLeft));
			}
			if (corner.includes("s")) {
				newBottom = textBottom + deltaY;
				newBottom = Math.max(
					textTop + 20,
					Math.min(previewRect.height, newBottom)
				);
			}
			if (corner.includes("n")) {
				newTop = textTop + deltaY;
				newTop = Math.max(0, Math.min(textBottom - 20, newTop));
			}

			newWidth = newRight - newLeft;
			newHeight = newBottom - newTop;

			if (newWidth < 50) {
				newWidth = 50;
				if (corner.includes("w")) {
					newLeft = newRight - 50;
				} else {
					newRight = newLeft + 50;
				}
			}
			if (newHeight < 20) {
				newHeight = 20;
				if (corner.includes("n")) {
					newTop = newBottom - 20;
				} else {
					newBottom = newTop + 20;
				}
			}

			const centerX = ((newLeft + newWidth / 2) / previewRect.width) * 100;
			const centerY = ((newTop + newHeight / 2) / previewRect.height) * 100;

			newX = Math.max(0, Math.min(100, centerX));
			newY = Math.max(0, Math.min(100, centerY));

			updateText(textId, {
				width: newWidth,
				height: newHeight,
				x: newX,
				y: newY,
			});
		};

		const handleMouseUp = () => {
			setTextResizing(null);
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	const addColorStop = () => {
		const newStop = {
			id: Date.now(),
			color: "#10b981",
			position: {
				x: Math.random() * 80 + 10,
				y: Math.random() * 80 + 10,
			},
		};
		setGradient((prev) => ({
			...prev,
			stops: [...prev.stops, newStop],
		}));
	};

	const removeColorStop = (id) => {
		if (gradient.stops.length > 2) {
			setGradient((prev) => ({
				...prev,
				stops: prev.stops.filter((stop) => stop.id !== id),
			}));
		}
	};

	const updateColorStop = (id, property, value) => {
		setGradient((prev) => ({
			...prev,
			stops: prev.stops.map((stop) =>
				stop.id === id ? { ...stop, [property]: value } : stop
			),
		}));
	};

	const handleMouseDown = useCallback((e, stopId) => {
		e.preventDefault();
		setIsDragging(true);
		setSelectedStop(stopId);

		const previewRect = previewRef.current.getBoundingClientRect();

		const handleMouseMove = (e) => {
			const x = ((e.clientX - previewRect.left) / previewRect.width) * 100;
			const y = ((e.clientY - previewRect.top) / previewRect.height) * 100;

			const clampedX = Math.max(0, Math.min(100, x));
			const clampedY = Math.max(0, Math.min(100, y));

			updateColorStop(stopId, "position", { x: clampedX, y: clampedY });
		};

		const handleMouseUp = () => {
			setIsDragging(false);
			setSelectedStop(null);
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	}, []);

	const handleKeyDown = useCallback(
		(e, stopId) => {
			if (!selectedStop || selectedStop !== stopId) return;

			const step = e.shiftKey ? 10 : 1;
			const stop = gradient.stops.find((s) => s.id === stopId);
			if (!stop) return;

			let newPosition = { ...stop.position };

			switch (e.key) {
				case "ArrowLeft":
					newPosition.x = Math.max(0, stop.position.x - step);
					break;
				case "ArrowRight":
					newPosition.x = Math.min(100, stop.position.x + step);
					break;
				case "ArrowUp":
					newPosition.y = Math.max(0, stop.position.y - step);
					break;
				case "ArrowDown":
					newPosition.y = Math.min(100, stop.position.y + step);
					break;
				case "Delete":
				case "Backspace":
					removeColorStop(stopId);
					return;
				default:
					return;
			}

			e.preventDefault();
			updateColorStop(stopId, "position", newPosition);
		},
		[selectedStop, gradient.stops]
	);

	const generateGradientCSS = () => {
		const sortedStops = [...gradient.stops].sort((a, b) => {
			// Sort by distance from top-left corner for consistent ordering
			const distA = Math.sqrt(
				a.position.x * a.position.x + a.position.y * a.position.y
			);
			const distB = Math.sqrt(
				b.position.x * b.position.x + b.position.y * b.position.y
			);
			return distA - distB;
		});

		if (gradient.type === "linear") {
			// Calculate angle from first and last stop
			const firstStop = sortedStops[0];
			const lastStop = sortedStops[sortedStops.length - 1];
			const angle =
				Math.atan2(
					lastStop.position.y - firstStop.position.y,
					lastStop.position.x - firstStop.position.x
				) *
				(180 / Math.PI);

			const stopsString = sortedStops
				.map((stop) => `${stop.color} ${Math.round(stop.position.x)}%`)
				.join(", ");

			return `linear-gradient(${Math.round(angle)}deg, ${stopsString})`;
		}

		if (gradient.type === "radial") {
			const stopsString = sortedStops
				.map(
					(stop) =>
						`${stop.color} ${Math.round(
							Math.sqrt(
								Math.pow(stop.position.x - 50, 2) +
									Math.pow(stop.position.y - 50, 2)
							)
						)}%`
				)
				.join(", ");

			return `radial-gradient(circle at 50% 50%, ${stopsString})`;
		}

		if (gradient.type === "conic") {
			const stopsString = sortedStops
				.map((stop) => `${stop.color} ${Math.round(stop.position.x)}%`)
				.join(", ");

			return `conic-gradient(from 0deg, ${stopsString})`;
		}

		if (gradient.type === "rectangle") {
			const stopsString = sortedStops
				.map(
					(stop) =>
						`${stop.color} ${Math.round(
							Math.max(
								Math.abs(stop.position.x - 50),
								Math.abs(stop.position.y - 50)
							) * 2
						)}%`
				)
				.join(", ");

			return `radial-gradient(ellipse at 50% 50%, ${stopsString})`;
		}

		if (gradient.type === "ellipse") {
			const stopsString = sortedStops
				.map(
					(stop) =>
						`${stop.color} ${Math.round(
							Math.sqrt(
								Math.pow((stop.position.x - 50) / 1.5, 2) +
									Math.pow((stop.position.y - 50) / 0.8, 2)
							) * 2
						)}%`
				)
				.join(", ");

			return `radial-gradient(ellipse 150% 80% at 50% 50%, ${stopsString})`;
		}

		if (gradient.type === "polygon") {
			const stopsString = sortedStops
				.map(
					(stop) =>
						`${stop.color} ${Math.round(
							Math.sqrt(
								Math.pow(stop.position.x - 50, 2) +
									Math.pow(stop.position.y - 50, 2)
							) * 1.5
						)}%`
				)
				.join(", ");

			return `radial-gradient(polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%) at 50% 50%, ${stopsString})`;
		}

		if (gradient.type === "mesh") {
			const stopsString = sortedStops
				.map(
					(stop) =>
						`${stop.color} ${Math.round(
							Math.sqrt(
								Math.pow(stop.position.x - 50, 2) +
									Math.pow(stop.position.y - 50, 2)
							) * 0.8
						)}%`
				)
				.join(", ");

			return `radial-gradient(circle at ${sortedStops[0]?.position.x || 50}% ${
				sortedStops[0]?.position.y || 50
			}%, ${stopsString})`;
		}

		return "";
	};

	// Simple CSS generation for main preview
	const generateAnimationCSS = () => {
		const { type, duration, easing, direction } = gradient.animation;
		const {
			type: bgType,
			direction: bgDirection,
			speed,
			easing: bgEasing,
			repeat,
		} = gradient.backgroundAnimation;

		let animation = "";
		let backgroundAnimation = "";

		// Element animation
		if (gradient.animation.enabled) {
			const infinite = repeat ? "infinite" : "1";
			switch (type) {
				case "rotate":
					animation = `spin ${duration}s ${easing} ${direction} ${infinite}`;
					break;
				case "pulse":
					animation = `pulse ${duration}s ${easing} ${direction} ${infinite}`;
					break;
				case "shift":
					animation = `bounce ${duration}s ${easing} ${direction} ${infinite}`;
					break;
			}
		}

		// Background animation
		if (gradient.backgroundAnimation.enabled) {
			const infinite = repeat ? "infinite" : "1";
			switch (bgType) {
				case "slide":
					if (bgDirection === "right") {
						backgroundAnimation = `slideRight ${speed}s ${bgEasing} ${infinite}`;
					} else if (bgDirection === "left") {
						backgroundAnimation = `slideLeft ${speed}s ${bgEasing} ${infinite}`;
					} else if (bgDirection === "up") {
						backgroundAnimation = `slideUp ${speed}s ${bgEasing} ${infinite}`;
					} else {
						backgroundAnimation = `slideDown ${speed}s ${bgEasing} ${infinite}`;
					}
					break;
				case "wave":
					backgroundAnimation = `wave ${speed}s ${bgEasing} ${infinite}`;
					break;
			}
		}

		return { animation, backgroundAnimation };
	};

	// Simple modal animation styles - direct CSS animations
	const getModalStyles = () => {
		const { type, duration, easing, direction } = gradient.animation;
		const {
			type: bgType,
			direction: bgDirection,
			speed,
			easing: bgEasing,
			repeat,
		} = gradient.backgroundAnimation;

		let containerStyle = {
			width: "100%",
			height: "100%",
			background: generateGradientCSS(),
			filter: gradient.noise.enabled
				? `contrast(${1 + gradient.noise.intensity * 0.2}) brightness(${
						1 + gradient.noise.intensity * 0.1
					})`
				: "none",
		};

		let overlayStyle = {};

		// Element animations
		if (gradient.animation.enabled && isPlaying) {
			const infinite = repeat ? "infinite" : "1";
			switch (type) {
				case "rotate":
					overlayStyle.animation = `spin ${duration}s ${easing} ${direction} ${infinite}`;
					overlayStyle.transformOrigin = "center";
					break;
				case "pulse":
					overlayStyle.animation = `pulse ${duration}s ${easing} ${direction} ${infinite}`;
					break;
				case "shift":
					overlayStyle.animation = `bounce ${duration}s ${easing} ${direction} ${infinite}`;
					break;
			}
		}

		// Background animations
		if (gradient.backgroundAnimation.enabled && isPlaying) {
			const infinite = repeat ? "infinite" : "1";
			switch (bgType) {
				case "slide":
					containerStyle.backgroundSize = "200% 200%";
					if (bgDirection === "right") {
						containerStyle.animation = `slideRight ${speed}s ${bgEasing} ${infinite}`;
					} else if (bgDirection === "left") {
						containerStyle.animation = `slideLeft ${speed}s ${bgEasing} ${infinite}`;
					} else if (bgDirection === "up") {
						containerStyle.animation = `slideUp ${speed}s ${bgEasing} ${infinite}`;
					} else {
						containerStyle.animation = `slideDown ${speed}s ${bgEasing} ${infinite}`;
					}
					break;
				case "wave":
					containerStyle.backgroundSize = "200% 200%";
					containerStyle.animation = `wave ${speed}s ${bgEasing} ${infinite}`;
					break;
			}
		}

		return { containerStyle, overlayStyle };
	};

	const copyToClipboard = async (text, type) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(type);
			setTimeout(() => setCopied(""), 2000);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	// Helper function to draw rounded rectangle on canvas
	const drawRoundedRect = (ctx, x, y, width, height, radius) => {
		if (!radius || radius === 0) {
			ctx.rect(x, y, width, height);
			return;
		}
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
	};

	// Simple SVG download - no canvas needed
	const downloadSVG = (dimensionType = downloadDimension) => {
		// Use previewFramePresets if dimensionType is a preview frame size, otherwise use dimensionPresets
		const dimensions =
			previewFramePresets[dimensionType] ||
			dimensionPresets[dimensionType] ||
			dimensionPresets.mobile;
		const width = dimensions.width;
		const height = dimensions.height;
		const sortedStops = [...gradient.stops].sort((a, b) => {
			const distA = Math.sqrt(
				a.position.x * a.position.x + a.position.y * a.position.y
			);
			const distB = Math.sqrt(
				b.position.x * b.position.x + b.position.y * b.position.y
			);
			return distA - distB;
		});

		let gradientElement = "";
		if (gradient.type === "linear") {
			const firstStop = sortedStops[0];
			const lastStop = sortedStops[sortedStops.length - 1];
			const angle =
				Math.atan2(
					lastStop.position.y - firstStop.position.y,
					lastStop.position.x - firstStop.position.x
				) *
				(180 / Math.PI);

			const radians = (angle * Math.PI) / 180;
			const x1 = 50 - 50 * Math.cos(radians);
			const y1 = 50 - 50 * Math.sin(radians);
			const x2 = 50 + 50 * Math.cos(radians);
			const y2 = 50 + 50 * Math.sin(radians);

			gradientElement = `
      <linearGradient id="gradientFill" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
        ${sortedStops
					.map(
						(stop) =>
							`<stop offset="${stop.position.x}%" stop-color="${stop.color}" />`
					)
					.join("\n        ")}
      </linearGradient>`;
		} else {
			gradientElement = `
      <radialGradient id="gradientFill" cx="50%" cy="50%" r="50%">
        ${sortedStops
					.map((stop) => {
						const distance = Math.sqrt(
							Math.pow(stop.position.x - 50, 2) +
								Math.pow(stop.position.y - 50, 2)
						);
						return `<stop offset="${distance}%" stop-color="${stop.color}" />`;
					})
					.join("\n        ")}
      </radialGradient>`;
		}

		// Calculate scale factor from preview to actual dimensions
		const previewActualHeight = previewRef.current?.offsetHeight || height;
		const previewActualWidth = previewRef.current?.offsetWidth || width;
		const scaleX = width / previewActualWidth;
		const scaleY = height / previewActualHeight;

		// Add images to SVG with all styles
		const imagesSVG = images
			.map((image, index) => {
				const scaledX = (image.x / 100) * width - (image.width * scaleX) / 2;
				const scaledY = (image.y / 100) * height - (image.height * scaleY) / 2;
				const scaledWidth = image.width * scaleX;
				const scaledHeight = image.height * scaleY;
				const styles = image.styles || {};

				// Build style string for image container
				const imageStyles = [];
				if (styles.opacity !== undefined && styles.opacity < 1) {
					imageStyles.push(`opacity: ${styles.opacity}`);
				}
				if (styles.borderRadius && styles.borderRadius > 0) {
					const scaledRadius = styles.borderRadius * scaleY;
					imageStyles.push(`border-radius: ${scaledRadius}px`);
				}
				const styleAttr =
					imageStyles.length > 0 ? ` style="${imageStyles.join("; ")}"` : "";

				// Build filter for shadow if exists
				let shadowFilterId = "";
				let shadowFilterDef = "";
				if (styles.shadow && styles.shadow !== "none") {
					shadowFilterId = `shadow-${index}`;
					let shadowBlur, shadowX, shadowY;
					switch (styles.shadow) {
						case "sm":
							shadowBlur = 2 * scaleY;
							shadowX = 0;
							shadowY = 1 * scaleY;
							break;
						case "md":
							shadowBlur = 4 * scaleY;
							shadowX = 0;
							shadowY = 2 * scaleY;
							break;
						case "lg":
							shadowBlur = 10 * scaleY;
							shadowX = 0;
							shadowY = 4 * scaleY;
							break;
						case "xl":
							shadowBlur = 20 * scaleY;
							shadowX = 0;
							shadowY = 10 * scaleY;
							break;
						case "2xl":
							shadowBlur = 25 * scaleY;
							shadowX = 0;
							shadowY = 12 * scaleY;
							break;
					}
					if (shadowBlur) {
						shadowFilterDef = `\n    <defs>
      <filter id="${shadowFilterId}">
        <feGaussianBlur in="SourceAlpha" stdDeviation="${shadowBlur / 2}" />
        <feOffset dx="${shadowX}" dy="${shadowY}" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.5" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>`;
					}
				}

				// Build clip-path for border-radius
				let clipPathId = "";
				let clipPathDef = "";
				if (styles.borderRadius && styles.borderRadius > 0) {
					clipPathId = `clip-${index}`;
					const scaledRadius = styles.borderRadius * scaleY;
					clipPathDef = `\n    <defs>
      <clipPath id="${clipPathId}">
        <rect x="${scaledX}" y="${scaledY}" width="${scaledWidth}" height="${scaledHeight}" rx="${scaledRadius}" ry="${scaledRadius}" />
      </clipPath>
    </defs>`;
				}

				// Image element with clip-path and filter
				let imageElement = `<g${shadowFilterId ? ` filter="url(#${shadowFilterId})"` : ""}${clipPathId ? ` clip-path="url(#${clipPathId})"` : ""}>`;

				// Border if exists
				if (styles.borderWidth && styles.borderWidth > 0) {
					const borderWidth = styles.borderWidth * scaleY;
					const borderColor = styles.borderColor || "#000000";
					const borderStyle = styles.borderStyle || "solid";
					const borderRadius = (styles.borderRadius || 0) * scaleY;

					if (borderStyle === "solid") {
						imageElement += `\n      <rect x="${scaledX}" y="${scaledY}" width="${scaledWidth}" height="${scaledHeight}" rx="${borderRadius}" ry="${borderRadius}" fill="none" stroke="${borderColor}" stroke-width="${borderWidth}" />`;
					} else if (borderStyle === "dashed") {
						const dashArray = `${borderWidth * 3},${borderWidth * 2}`;
						imageElement += `\n      <rect x="${scaledX}" y="${scaledY}" width="${scaledWidth}" height="${scaledHeight}" rx="${borderRadius}" ry="${borderRadius}" fill="none" stroke="${borderColor}" stroke-width="${borderWidth}" stroke-dasharray="${dashArray}" />`;
					} else if (borderStyle === "dotted") {
						imageElement += `\n      <rect x="${scaledX}" y="${scaledY}" width="${scaledWidth}" height="${scaledHeight}" rx="${borderRadius}" ry="${borderRadius}" fill="none" stroke="${borderColor}" stroke-width="${borderWidth}" stroke-dasharray="${borderWidth},${borderWidth}" />`;
					}
				}

				// Image itself
				imageElement += `\n      <image href="${image.src}" x="${scaledX}" y="${scaledY}" width="${scaledWidth}" height="${scaledHeight}" preserveAspectRatio="${styles.objectFit === "cover" ? "xMidYMid slice" : styles.objectFit === "fill" ? "none" : "xMidYMid meet"}"${styleAttr} />`;

				// Ring if exists
				if (styles.ringWidth && styles.ringWidth > 0) {
					const ringWidth = styles.ringWidth * scaleY;
					const ringColor = styles.ringColor || "#3b82f6";
					const ringOffset = 2 * scaleY;
					const ringRadius = (styles.borderRadius || 0) * scaleY;
					imageElement += `\n      <rect x="${scaledX - ringOffset - ringWidth}" y="${scaledY - ringOffset - ringWidth}" width="${scaledWidth + (ringOffset + ringWidth) * 2}" height="${scaledHeight + (ringOffset + ringWidth) * 2}" rx="${ringRadius + ringOffset + ringWidth}" ry="${ringRadius + ringOffset + ringWidth}" fill="none" stroke="${ringColor}" stroke-width="${ringWidth}" />`;
				}

				imageElement += `\n    </g>`;

				// Add caption as text if exists
				if (image.caption) {
					const captionX = scaledX + scaledWidth / 2;
					const captionY = scaledY + scaledHeight + 20 * scaleY;
					imageElement += `\n    <text x="${captionX}" y="${captionY}" text-anchor="middle" fill="black" font-size="${16 * scaleY}" font-family="Arial">${image.caption.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</text>`;
				}

				return (shadowFilterDef || clipPathDef) + imageElement;
			})
			.join("\n    ");

		// Add text elements to SVG with all styles
		const textsSVG = texts
			.map((text, textIndex) => {
				const scaledX = (text.x / 100) * width;
				const scaledY = (text.y / 100) * height;
				const scaledWidth = text.width * scaleX;
				const scaledHeight = text.height * scaleY;
				const styles = text.styles || {};

				// Extract style values
				let textAnchor = "start";
				if (styles.textAlign === "center") {
					textAnchor = "middle";
				} else if (styles.textAlign === "right") {
					textAnchor = "end";
				}

				const fillColor = styles.color || "#000000";
				const fontSize = (styles.fontSize || 24) * scaleY;
				const fontFamily = styles.fontFamily || "Arial";
				const fontWeight = styles.fontWeight || "normal";
				const fontStyle = styles.fontStyle || "normal";
				const opacity = styles.opacity !== undefined ? styles.opacity : 1;
				const padding = (styles.padding || 0) * scaleY;
				const borderRadius = (styles.borderRadius || 0) * scaleY;
				const borderWidth = (styles.borderWidth || 0) * scaleY;
				const borderColor = styles.borderColor || "#000000";
				const borderStyle = styles.borderStyle || "solid";
				const backgroundColor = styles.backgroundColor || "transparent";

				// Calculate text bounds
				const textBoundsX = scaledX - scaledWidth / 2;
				const textBoundsY = scaledY - scaledHeight / 2;
				const textBoundsWidth = scaledWidth;
				const textBoundsHeight = scaledHeight;

				// Build shadow filter if exists
				let shadowFilterId = "";
				let shadowFilterDef = "";
				if (styles.shadow && styles.shadow !== "none") {
					shadowFilterId = `text-shadow-${textIndex}`;
					let shadowBlur, shadowX, shadowY, shadowColor;
					switch (styles.shadow) {
						case "sm":
							shadowBlur = 2 * scaleY;
							shadowX = 0;
							shadowY = 1 * scaleY;
							shadowColor = "rgba(0, 0, 0, 0.05)";
							break;
						case "md":
							shadowBlur = 4 * scaleY;
							shadowX = 0;
							shadowY = 2 * scaleY;
							shadowColor = "rgba(0, 0, 0, 0.1)";
							break;
						case "lg":
							shadowBlur = 10 * scaleY;
							shadowX = 0;
							shadowY = 4 * scaleY;
							shadowColor = "rgba(0, 0, 0, 0.1)";
							break;
						case "xl":
							shadowBlur = 20 * scaleY;
							shadowX = 0;
							shadowY = 10 * scaleY;
							shadowColor = "rgba(0, 0, 0, 0.1)";
							break;
						case "2xl":
							shadowBlur = 25 * scaleY;
							shadowX = 0;
							shadowY = 12 * scaleY;
							shadowColor = "rgba(0, 0, 0, 0.25)";
							break;
					}
					if (shadowBlur) {
						shadowFilterDef = `\n    <defs>
      <filter id="${shadowFilterId}">
        <feGaussianBlur in="SourceAlpha" stdDeviation="${shadowBlur / 2}" />
        <feOffset dx="${shadowX}" dy="${shadowY}" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.5" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>`;
					}
				}

				// Escape text content for XML
				const escapedContent = text.content
					.replace(/&/g, "&amp;")
					.replace(/</g, "&lt;")
					.replace(/>/g, "&gt;")
					.replace(/"/g, "&quot;")
					.replace(/'/g, "&apos;");

				// Build text group with background, border, and text
				let textGroup = `<g${shadowFilterId ? ` filter="url(#${shadowFilterId})"` : ""} opacity="${opacity}">`;

				// Background rectangle
				if (backgroundColor !== "transparent") {
					textGroup += `\n      <rect x="${textBoundsX}" y="${textBoundsY}" width="${textBoundsWidth}" height="${textBoundsHeight}" rx="${borderRadius}" ry="${borderRadius}" fill="${backgroundColor}" />`;
				}

				// Border
				if (borderWidth > 0) {
					const borderX = textBoundsX;
					const borderY = textBoundsY;
					const borderRectWidth = textBoundsWidth;
					const borderRectHeight = textBoundsHeight;

					if (borderStyle === "solid") {
						textGroup += `\n      <rect x="${borderX}" y="${borderY}" width="${borderRectWidth}" height="${borderRectHeight}" rx="${borderRadius}" ry="${borderRadius}" fill="none" stroke="${borderColor}" stroke-width="${borderWidth}" />`;
					} else if (borderStyle === "dashed") {
						const dashArray = `${borderWidth * 3},${borderWidth * 2}`;
						textGroup += `\n      <rect x="${borderX}" y="${borderY}" width="${borderRectWidth}" height="${borderRectHeight}" rx="${borderRadius}" ry="${borderRadius}" fill="none" stroke="${borderColor}" stroke-width="${borderWidth}" stroke-dasharray="${dashArray}" />`;
					} else if (borderStyle === "dotted") {
						textGroup += `\n      <rect x="${borderX}" y="${borderY}" width="${borderRectWidth}" height="${borderRectHeight}" rx="${borderRadius}" ry="${borderRadius}" fill="none" stroke="${borderColor}" stroke-width="${borderWidth}" stroke-dasharray="${borderWidth},${borderWidth}" />`;
					}
				}

				// Text element
				const lines = escapedContent.split("\n");
				lines.forEach((line, lineIndex) => {
					const lineY =
						scaledY + (lineIndex - (lines.length - 1) / 2) * fontSize * 1.2;
					textGroup += `\n      <text x="${scaledX}" y="${lineY}" text-anchor="${textAnchor}" fill="${fillColor}" font-size="${fontSize}" font-family="${fontFamily}" font-weight="${fontWeight}" font-style="${fontStyle}">${line}</text>`;
				});

				textGroup += `\n    </g>`;

				return shadowFilterDef + textGroup;
			})
			.join("\n    ");

		// Collect all defs from images and texts (extract defs blocks and keep content)
		let allDefs = [];
		let imageContent = imagesSVG;
		let textContent = textsSVG;

		// Extract defs from images
		const imageDefsRegex = /    <defs>([\s\S]*?)    <\/defs>/g;
		let match;
		while ((match = imageDefsRegex.exec(imagesSVG)) !== null) {
			allDefs.push(match[1].trim());
		}
		imageContent = imagesSVG.replace(imageDefsRegex, "").trim();

		// Extract defs from texts
		const textDefsRegex = /    <defs>([\s\S]*?)    <\/defs>/g;
		while ((match = textDefsRegex.exec(textsSVG)) !== null) {
			allDefs.push(match[1].trim());
		}
		textContent = textsSVG.replace(textDefsRegex, "").trim();

		// Add shapes to SVG
		const shapesSVG = shapes
			.map((shape, shapeIndex) => {
				const scaledX = (shape.x / 100) * width - (shape.width * scaleX) / 2;
				const scaledY = (shape.y / 100) * height - (shape.height * scaleY) / 2;
				const scaledWidth = shape.width * scaleX;
				const scaledHeight = shape.height * scaleY;
				const styles = shape.styles || {};

				// Build shadow filter if exists
				let shadowFilterId = "";
				let shadowFilterDef = "";
				if (styles.shadow && styles.shadow !== "none") {
					shadowFilterId = `shape-shadow-${shapeIndex}`;
					let shadowBlur, shadowX, shadowY;
					switch (styles.shadow) {
						case "sm":
							shadowBlur = 2 * scaleY;
							shadowX = 0;
							shadowY = 1 * scaleY;
							break;
						case "md":
							shadowBlur = 4 * scaleY;
							shadowX = 0;
							shadowY = 2 * scaleY;
							break;
						case "lg":
							shadowBlur = 10 * scaleY;
							shadowX = 0;
							shadowY = 4 * scaleY;
							break;
						case "xl":
							shadowBlur = 20 * scaleY;
							shadowX = 0;
							shadowY = 10 * scaleY;
							break;
						case "2xl":
							shadowBlur = 25 * scaleY;
							shadowX = 0;
							shadowY = 12 * scaleY;
							break;
					}
					if (shadowBlur) {
						shadowFilterDef = `\n    <defs>
      <filter id="${shadowFilterId}">
        <feGaussianBlur in="SourceAlpha" stdDeviation="${shadowBlur / 2}" />
        <feOffset dx="${shadowX}" dy="${shadowY}" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.5" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>`;
					}
				}

				let shapeElement = `<g${shadowFilterId ? ` filter="url(#${shadowFilterId})"` : ""} opacity="${styles.opacity !== undefined ? styles.opacity : 1}">`;

				if (shape.type === "rectangle" || shape.type === "square") {
					shapeElement += `\n      <rect x="${scaledX}" y="${scaledY}" width="${scaledWidth}" height="${scaledHeight}" fill="${styles.fillColor || "#3b82f6"}" stroke="${styles.strokeColor || "#1e40af"}" stroke-width="${(styles.strokeWidth || 2) * scaleY}" rx="${(styles.borderRadius || 0) * scaleY}" ry="${(styles.borderRadius || 0) * scaleY}" />`;
				} else if (shape.type === "line") {
					const lineY = scaledY + scaledHeight / 2;
					shapeElement += `\n      <line x1="${scaledX}" y1="${lineY}" x2="${scaledX + scaledWidth}" y2="${lineY}" stroke="${styles.strokeColor || "#1e40af"}" stroke-width="${(styles.strokeWidth || 2) * scaleY}" />`;
				} else if (shape.type === "triangle") {
					const points = `${scaledX + scaledWidth / 2},${scaledY} ${scaledX},${scaledY + scaledHeight} ${scaledX + scaledWidth},${scaledY + scaledHeight}`;
					shapeElement += `\n      <polygon points="${points}" fill="${styles.fillColor || "#3b82f6"}" stroke="${styles.strokeColor || "#1e40af"}" stroke-width="${(styles.strokeWidth || 2) * scaleY}" />`;
				}

				shapeElement += `\n    </g>`;

				return shadowFilterDef + shapeElement;
			})
			.join("\n    ");

		// Extract defs from shapes
		let shapeDefs = [];
		let shapeContent = shapesSVG;
		const shapeDefsRegex = /    <defs>([\s\S]*?)    <\/defs>/g;
		let shapeMatch;
		while ((shapeMatch = shapeDefsRegex.exec(shapesSVG)) !== null) {
			shapeDefs.push(shapeMatch[1].trim());
		}
		shapeContent = shapesSVG.replace(shapeDefsRegex, "").trim();

		const defsContent =
			allDefs.length > 0 || shapeDefs.length > 0
				? "\n    " + [...allDefs, ...shapeDefs].join("\n    ")
				: "";

		const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>${gradientElement}${defsContent}
  </defs>
  <rect width="100%" height="100%" fill="url(#gradientFill)" />
  ${imageContent}
  ${textContent}
  ${shapeContent}
</svg>`;

		const blob = new Blob([svg], { type: "image/svg+xml" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `gradient-${dimensionType}-${width}x${height}-${Date.now()}.svg`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	// GIF download function - captures animated frames
	const downloadGIF = async (dimensionType = downloadDimension) => {
		// For now, show a message that GIF export is coming soon
		// or use a simpler approach
		alert(
			"GIF export is being processed. This feature will capture animated frames of your gradient."
		);
		// TODO: Implement GIF capture using gif.js or similar library
	};

	// MP4 download function using ffmpeg.wasm
	const downloadMP4 = async (dimensionType = downloadDimension) => {
		if (typeof window === "undefined") return;

		setIsGeneratingMP4(true);
		setMp4Progress(0);

		try {
			// Get dimensions
			const dimensions =
				previewFramePresets[dimensionType] ||
				dimensionPresets[dimensionType] ||
				dimensionPresets.mobile;
			const width = dimensions.width;
			const height = dimensions.height;

			setMp4Progress(10);

			// Create canvas
			const canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext("2d");

			// Helper function to draw gradient on canvas
			const drawGradient = () => {
				let gradientObj;
				const sortedStops = [...gradient.stops].sort((a, b) => {
					const distA = Math.sqrt(
						a.position.x * a.position.x + a.position.y * a.position.y
					);
					const distB = Math.sqrt(
						b.position.x * b.position.x + b.position.y * b.position.y
					);
					return distA - distB;
				});

				if (gradient.type === "linear") {
					const firstStop = sortedStops[0];
					const lastStop = sortedStops[sortedStops.length - 1];
					const angle =
						Math.atan2(
							lastStop.position.y - firstStop.position.y,
							lastStop.position.x - firstStop.position.x
						) *
						(180 / Math.PI);

					const radians = (angle * Math.PI) / 180;
					const x1 = width / 2 - (width / 2) * Math.cos(radians);
					const y1 = height / 2 - (width / 2) * Math.sin(radians);
					const x2 = width / 2 + (width / 2) * Math.cos(radians);
					const y2 = height / 2 + (width / 2) * Math.sin(radians);

					gradientObj = ctx.createLinearGradient(x1, y1, x2, y2);
					sortedStops.forEach((stop) => {
						const position = Math.round(stop.position.x) / 100;
						gradientObj.addColorStop(position, stop.color);
					});
				} else {
					gradientObj = ctx.createRadialGradient(
						width / 2,
						height / 2,
						0,
						width / 2,
						height / 2,
						Math.max(width, height) / 2
					);
					sortedStops.forEach((stop) => {
						const distance = Math.sqrt(
							Math.pow(stop.position.x - 50, 2) +
								Math.pow(stop.position.y - 50, 2)
						);
						const position = Math.round(distance) / 100;
						gradientObj.addColorStop(position, stop.color);
					});
				}

				ctx.fillStyle = gradientObj;
				ctx.fillRect(0, 0, width, height);
			};

			// Helper function to draw all elements (similar to downloadRaster)
			const drawAllElements = async () => {
				if (!previewRef.current) return;

				const previewActualHeight = previewRef.current.offsetHeight;
				const previewActualWidth = previewRef.current.offsetWidth;
				const scaleX = width / previewActualWidth;
				const scaleY = height / previewActualHeight;

				// Load images
				const imageDrawFunctions = await Promise.all(
					images.map((image) => {
						return new Promise((resolve) => {
							const img = new Image();
							img.crossOrigin = "anonymous";
							img.onload = () => {
								resolve({ image, img, ready: true });
							};
							img.onerror = () => resolve({ image, img: null, ready: false });
							img.src = image.src;
						});
					})
				);

				// Load videos
				const videoDrawFunctions = await Promise.all(
					videos.map((video) => {
						return new Promise((resolve) => {
							const vid = document.createElement("video");
							vid.crossOrigin = "anonymous";
							vid.src = video.src;
							vid.muted = true;
							vid.loop = true;
							vid.playsInline = true;
							vid.onloadeddata = async () => {
								try {
									await vid.play();
									resolve({ video, vid, ready: true });
								} catch (error) {
									console.error("Error playing video:", error);
									resolve({ video, vid, ready: true }); // Still resolve, video might play later
								}
							};
							vid.onerror = () => resolve({ video, vid: null, ready: false });
							vid.load();
						});
					})
				);

				// Combine all elements and sort by z-index
				const allDrawableElements = [
					...imageDrawFunctions
						.filter((item) => item.ready)
						.map(({ image, img }) => ({
							type: "image",
							element: image,
							img,
							zIndex: image.styles?.zIndex || 1,
						})),
					...videoDrawFunctions
						.filter((item) => item.ready)
						.map(({ video, vid }) => ({
							type: "video",
							element: video,
							vid,
							zIndex: video.styles?.zIndex || 1,
						})),
					...texts.map((txt) => ({
						type: "text",
						element: txt,
						zIndex: txt.styles?.zIndex || 2,
					})),
					...shapes.map((shape) => ({
						type: "shape",
						element: shape,
						zIndex: shape.styles?.zIndex || 1,
					})),
				].sort((a, b) => a.zIndex - b.zIndex);

				// Draw all elements (similar logic to downloadRaster but simplified for video frames)
				allDrawableElements.forEach(({ type, element, img, vid }) => {
					if (type === "image" && img) {
						const image = element;
						const scaledX =
							(image.x / 100) * width - (image.width * scaleX) / 2;
						const scaledY =
							(image.y / 100) * height - (image.height * scaleY) / 2;
						const scaledWidth = image.width * scaleX;
						const scaledHeight = image.height * scaleY;
						const styles = image.styles || {};

						ctx.save();
						ctx.globalAlpha = styles.opacity !== undefined ? styles.opacity : 1;

						if (styles.borderRadius && styles.borderRadius > 0) {
							const borderRadius = styles.borderRadius * scaleY;
							drawRoundedRect(
								ctx,
								scaledX,
								scaledY,
								scaledWidth,
								scaledHeight,
								borderRadius
							);
							ctx.clip();
						}

						// Handle object-fit
						const tempCanvas = document.createElement("canvas");
						tempCanvas.width = scaledWidth;
						tempCanvas.height = scaledHeight;
						const tempCtx = tempCanvas.getContext("2d");

						if (styles.objectFit === "cover") {
							const imgAspect = img.width / img.height;
							const boxAspect = scaledWidth / scaledHeight;
							let drawWidth = scaledWidth;
							let drawHeight = scaledHeight;
							let drawX = 0;
							let drawY = 0;

							if (imgAspect > boxAspect) {
								drawHeight = scaledHeight;
								drawWidth = scaledHeight * imgAspect;
								drawX = (scaledWidth - drawWidth) / 2;
							} else {
								drawWidth = scaledWidth;
								drawHeight = scaledWidth / imgAspect;
								drawY = (scaledHeight - drawHeight) / 2;
							}
							tempCtx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
						} else {
							tempCtx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
						}

						ctx.drawImage(tempCanvas, scaledX, scaledY);
						ctx.restore();

						// Draw border
						if (styles.borderWidth && styles.borderWidth > 0) {
							const borderWidth = styles.borderWidth * scaleY;
							const borderColor = styles.borderColor || "#000000";
							const borderRadius = (styles.borderRadius || 0) * scaleY;

							ctx.strokeStyle = borderColor;
							ctx.lineWidth = borderWidth;
							drawRoundedRect(
								ctx,
								scaledX,
								scaledY,
								scaledWidth,
								scaledHeight,
								borderRadius
							);
							ctx.stroke();
						}
					} else if (type === "video" && vid) {
						const video = element;
						const scaledX =
							(video.x / 100) * width - (video.width * scaleX) / 2;
						const scaledY =
							(video.y / 100) * height - (video.height * scaleY) / 2;
						const scaledWidth = video.width * scaleX;
						const scaledHeight = video.height * scaleY;
						const styles = video.styles || {};

						ctx.save();
						ctx.globalAlpha = styles.opacity !== undefined ? styles.opacity : 1;

						if (styles.borderRadius && styles.borderRadius > 0) {
							const borderRadius = styles.borderRadius * scaleY;
							drawRoundedRect(
								ctx,
								scaledX,
								scaledY,
								scaledWidth,
								scaledHeight,
								borderRadius
							);
							ctx.clip();
						}

						// Draw video frame
						ctx.drawImage(vid, scaledX, scaledY, scaledWidth, scaledHeight);
						ctx.restore();

						// Draw border
						if (styles.borderWidth && styles.borderWidth > 0) {
							const borderWidth = styles.borderWidth * scaleY;
							const borderColor = styles.borderColor || "#000000";
							const borderRadius = (styles.borderRadius || 0) * scaleY;

							ctx.strokeStyle = borderColor;
							ctx.lineWidth = borderWidth;
							drawRoundedRect(
								ctx,
								scaledX,
								scaledY,
								scaledWidth,
								scaledHeight,
								borderRadius
							);
							ctx.stroke();
						}
					} else if (type === "text") {
						const text = element;
						const scaledX = (text.x / 100) * width;
						const scaledY = (text.y / 100) * height;
						const scaledWidth = text.width * scaleX;
						const scaledHeight = text.height * scaleY;
						const styles = text.styles || {};

						ctx.save();
						ctx.globalAlpha = styles.opacity !== undefined ? styles.opacity : 1;

						const padding = (styles.padding || 0) * scaleY;
						const textBoundsX = scaledX - scaledWidth / 2;
						const textBoundsY = scaledY - scaledHeight / 2;
						const textBoundsWidth = scaledWidth;
						const textBoundsHeight = scaledHeight;
						const borderRadius = (styles.borderRadius || 0) * scaleY;

						// Draw background
						if (
							styles.backgroundColor &&
							styles.backgroundColor !== "transparent"
						) {
							ctx.fillStyle = styles.backgroundColor;
							drawRoundedRect(
								ctx,
								textBoundsX,
								textBoundsY,
								textBoundsWidth,
								textBoundsHeight,
								borderRadius
							);
							ctx.fill();
						}

						// Draw border
						if (styles.borderWidth && styles.borderWidth > 0) {
							const borderWidth = styles.borderWidth * scaleY;
							const borderColor = styles.borderColor || "#000000";
							ctx.strokeStyle = borderColor;
							ctx.lineWidth = borderWidth;
							drawRoundedRect(
								ctx,
								textBoundsX,
								textBoundsY,
								textBoundsWidth,
								textBoundsHeight,
								borderRadius
							);
							ctx.stroke();
						}

						// Draw text
						const fontSize = (styles.fontSize || 24) * scaleY;
						const fontFamily = styles.fontFamily || "Arial";
						ctx.font = `${styles.fontStyle || "normal"} ${styles.fontWeight || "normal"} ${fontSize}px ${fontFamily}`;
						ctx.fillStyle = styles.color || "#000000";
						ctx.textAlign = styles.textAlign || "left";
						ctx.textBaseline = "middle";

						const lines = text.content.split("\n");
						const lineHeight = fontSize * 1.2;
						const startY = scaledY - ((lines.length - 1) * lineHeight) / 2;

						lines.forEach((line, index) => {
							let lineX = scaledX;
							if (styles.textAlign === "left") {
								lineX = textBoundsX + padding;
							} else if (styles.textAlign === "right") {
								lineX = textBoundsX + textBoundsWidth - padding;
							}
							ctx.fillText(line, lineX, startY + index * lineHeight);
						});

						ctx.restore();
					} else if (type === "shape") {
						const shape = element;
						const scaledX =
							(shape.x / 100) * width - (shape.width * scaleX) / 2;
						const scaledY =
							(shape.y / 100) * height - (shape.height * scaleY) / 2;
						const scaledWidth = shape.width * scaleX;
						const scaledHeight = shape.height * scaleY;
						const styles = shape.styles || {};

						ctx.save();
						ctx.globalAlpha = styles.opacity !== undefined ? styles.opacity : 1;

						// Draw shadow if exists
						if (styles.shadow && styles.shadow !== "none") {
							ctx.save();
							ctx.globalAlpha = 0.3;
							ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
							let shadowBlur = 0;
							let shadowY = 0;
							switch (styles.shadow) {
								case "sm":
									shadowBlur = 2 * scaleY;
									shadowY = 1 * scaleY;
									break;
								case "md":
									shadowBlur = 4 * scaleY;
									shadowY = 2 * scaleY;
									break;
								case "lg":
									shadowBlur = 10 * scaleY;
									shadowY = 4 * scaleY;
									break;
								case "xl":
									shadowBlur = 20 * scaleY;
									shadowY = 10 * scaleY;
									break;
								case "2xl":
									shadowBlur = 25 * scaleY;
									shadowY = 12 * scaleY;
									break;
							}
							if (shadowBlur > 0) {
								ctx.filter = `blur(${shadowBlur}px)`;
								if (shape.type === "rectangle" || shape.type === "square") {
									const shadowRadius = (styles.borderRadius || 0) * scaleY;
									drawRoundedRect(
										ctx,
										scaledX,
										scaledY + shadowY,
										scaledWidth,
										scaledHeight,
										shadowRadius
									);
									ctx.fill();
								} else if (shape.type === "triangle") {
									ctx.beginPath();
									ctx.moveTo(scaledX + scaledWidth / 2, scaledY + shadowY);
									ctx.lineTo(scaledX, scaledY + scaledHeight + shadowY);
									ctx.lineTo(
										scaledX + scaledWidth,
										scaledY + scaledHeight + shadowY
									);
									ctx.closePath();
									ctx.fill();
								} else if (shape.type === "line") {
									ctx.beginPath();
									ctx.moveTo(scaledX, scaledY + scaledHeight / 2 + shadowY);
									ctx.lineTo(
										scaledX + scaledWidth,
										scaledY + scaledHeight / 2 + shadowY
									);
									ctx.stroke();
								}
								ctx.filter = "none";
							}
							ctx.restore();
						}

						// Draw shape
						if (shape.type === "rectangle" || shape.type === "square") {
							const borderRadius = (styles.borderRadius || 0) * scaleY;
							ctx.fillStyle = styles.fillColor || "#3b82f6";
							drawRoundedRect(
								ctx,
								scaledX,
								scaledY,
								scaledWidth,
								scaledHeight,
								borderRadius
							);
							ctx.fill();

							if (styles.strokeWidth && styles.strokeWidth > 0) {
								ctx.strokeStyle = styles.strokeColor || "#1e40af";
								ctx.lineWidth = (styles.strokeWidth || 2) * scaleY;
								drawRoundedRect(
									ctx,
									scaledX,
									scaledY,
									scaledWidth,
									scaledHeight,
									borderRadius
								);
								ctx.stroke();
							}
						} else if (shape.type === "triangle") {
							ctx.fillStyle = styles.fillColor || "#3b82f6";
							ctx.beginPath();
							ctx.moveTo(scaledX + scaledWidth / 2, scaledY);
							ctx.lineTo(scaledX, scaledY + scaledHeight);
							ctx.lineTo(scaledX + scaledWidth, scaledY + scaledHeight);
							ctx.closePath();
							ctx.fill();

							if (styles.strokeWidth && styles.strokeWidth > 0) {
								ctx.strokeStyle = styles.strokeColor || "#1e40af";
								ctx.lineWidth = (styles.strokeWidth || 2) * scaleY;
								ctx.stroke();
							}
						} else if (shape.type === "line") {
							ctx.strokeStyle = styles.strokeColor || "#1e40af";
							ctx.lineWidth = (styles.strokeWidth || 2) * scaleY;
							ctx.beginPath();
							ctx.moveTo(scaledX, scaledY + scaledHeight / 2);
							ctx.lineTo(scaledX + scaledWidth, scaledY + scaledHeight / 2);
							ctx.stroke();
						}

						ctx.restore();
					}
				});
			};

			setMp4Progress(20);

			// Start video recording
			const stream = canvas.captureStream(30); // 30 FPS
			const mediaRecorder = new MediaRecorder(stream, {
				mimeType: "video/webm;codecs=vp9",
			});

			const chunks = [];
			mediaRecorder.ondataavailable = (e) => {
				if (e.data.size > 0) {
					chunks.push(e.data);
				}
			};

			// Record duration - 5 seconds or animation duration
			const duration = 5000; // 5 seconds
			let frameCount = 0;
			const totalFrames = 150; // 30 fps * 5 seconds

			// Start recording
			mediaRecorder.start();

			// Wait for all media to load
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Animation loop using setInterval for better control
			const frameInterval = 1000 / 30; // 30 FPS
			const animate = async () => {
				const drawFrame = async () => {
					if (frameCount >= totalFrames) {
						mediaRecorder.stop();
						return;
					}

					// Draw gradient with animation
					drawGradient();

					// Draw all elements
					await drawAllElements();

					// Update progress
					const progress = 20 + (frameCount / totalFrames) * 50;
					setMp4Progress(Math.min(progress, 70));

					frameCount++;
					if (frameCount < totalFrames) {
						setTimeout(drawFrame, frameInterval);
					}
				};

				await drawFrame();
			};

			// Start animation
			await animate();

			// Wait for recording to finish
			await new Promise((resolve) => {
				mediaRecorder.onstop = () => {
					resolve();
				};
			});

			setMp4Progress(75);

			// Convert WebM to MP4 using ffmpeg.wasm
			const webmBlob = new Blob(chunks, { type: "video/webm" });
			await convertWebmToMp4(webmBlob, width, height, dimensionType);
		} catch (error) {
			console.error("Error generating MP4:", error);
			alert("Error generating MP4 video. Please try again.");
			setIsGeneratingMP4(false);
			setMp4Progress(0);
		}
	};

	// Convert WebM to MP4 using ffmpeg.wasm
	const convertWebmToMp4 = async (webmBlob, width, height, dimensionType) => {
		if (typeof window === "undefined") {
			setIsGeneratingMP4(false);
			return;
		}

		try {
			setMp4Progress(80);

			// Dynamically import ffmpeg
			const { FFmpeg } = await import("@ffmpeg/ffmpeg");
			const { fetchFile, toBlobURL } = await import("@ffmpeg/util");

			const ffmpeg = new FFmpeg();
			ffmpeg.on("log", ({ message }) => {
				console.log(message);
			});

			setMp4Progress(85);

			// Load ffmpeg
			const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
			await ffmpeg.load({
				coreURL: await toBlobURL(
					`${baseURL}/ffmpeg-core.js`,
					"text/javascript"
				),
				wasmURL: await toBlobURL(
					`${baseURL}/ffmpeg-core.wasm`,
					"application/wasm"
				),
			});

			setMp4Progress(90);

			// Write input file
			await ffmpeg.writeFile("input.webm", await fetchFile(webmBlob));

			// Convert to MP4
			await ffmpeg.exec([
				"-i",
				"input.webm",
				"-c:v",
				"libx264",
				"-preset",
				"medium",
				"-crf",
				"23",
				"-c:a",
				"copy",
				"output.mp4",
			]);

			setMp4Progress(95);

			// Read output file
			const data = await ffmpeg.readFile("output.mp4");

			// Create download link
			const blob = new Blob([data], { type: "video/mp4" });
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `gradient-${dimensionType}-${width}x${height}-${Date.now()}.mp4`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);

			// Cleanup
			await ffmpeg.deleteFile("input.webm");
			await ffmpeg.deleteFile("output.mp4");

			setMp4Progress(100);
			setTimeout(() => {
				setIsGeneratingMP4(false);
				setMp4Progress(0);
			}, 500);
		} catch (error) {
			console.error("Error converting to MP4:", error);
			alert("Error converting video to MP4. Please try again.");
			setIsGeneratingMP4(false);
			setMp4Progress(0);
		}
	};

	// Canvas-based download for PNG/JPEG
	const downloadRaster = (
		format = "png",
		dimensionType = downloadDimension
	) => {
		// Use previewFramePresets if dimensionType is a preview frame size, otherwise use dimensionPresets
		const dimensions =
			previewFramePresets[dimensionType] ||
			dimensionPresets[dimensionType] ||
			dimensionPresets.mobile;
		const canvas = document.createElement("canvas");
		const width = dimensions.width;
		const height = dimensions.height;
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext("2d");

		// Create gradient based on type
		let gradientObj;
		const sortedStops = [...gradient.stops].sort((a, b) => {
			const distA = Math.sqrt(
				a.position.x * a.position.x + a.position.y * a.position.y
			);
			const distB = Math.sqrt(
				b.position.x * b.position.x + b.position.y * b.position.y
			);
			return distA - distB;
		});

		if (gradient.type === "linear") {
			const firstStop = sortedStops[0];
			const lastStop = sortedStops[sortedStops.length - 1];
			const angle =
				Math.atan2(
					lastStop.position.y - firstStop.position.y,
					lastStop.position.x - firstStop.position.x
				) *
				(180 / Math.PI);

			const radians = (angle * Math.PI) / 180;
			const x1 = width / 2 - (width / 2) * Math.cos(radians);
			const y1 = height / 2 - (width / 2) * Math.sin(radians);
			const x2 = width / 2 + (width / 2) * Math.cos(radians);
			const y2 = height / 2 + (width / 2) * Math.sin(radians);

			gradientObj = ctx.createLinearGradient(x1, y1, x2, y2);
			sortedStops.forEach((stop) => {
				const position = Math.round(stop.position.x) / 100;
				gradientObj.addColorStop(position, stop.color);
			});
		} else {
			// Radial and other types
			gradientObj = ctx.createRadialGradient(
				width / 2,
				height / 2,
				0,
				width / 2,
				height / 2,
				Math.max(width, height) / 2
			);
			sortedStops.forEach((stop) => {
				const distance = Math.sqrt(
					Math.pow(stop.position.x - 50, 2) + Math.pow(stop.position.y - 50, 2)
				);
				const position = Math.round(distance) / 100;
				gradientObj.addColorStop(position, stop.color);
			});
		}

		ctx.fillStyle = gradientObj;
		ctx.fillRect(0, 0, width, height);

		// Draw all elements (images and texts) on canvas with all styles, respecting z-index
		const drawAllElements = async () => {
			if (!previewRef.current) return;

			const previewActualHeight = previewRef.current.offsetHeight;
			const previewActualWidth = previewRef.current.offsetWidth;
			const scaleX = width / previewActualWidth;
			const scaleY = height / previewActualHeight;

			// Load all images first and prepare draw functions
			const imageDrawFunctions = await Promise.all(
				images.map((image) => {
					return new Promise((resolve) => {
						const img = new Image();
						img.crossOrigin = "anonymous";
						img.onload = () => {
							resolve({ image, img, ready: true });
						};
						img.onerror = () => resolve({ image, img: null, ready: false });
						img.src = image.src;
					});
				})
			);

			// Combine all drawable elements and sort by z-index
			const allDrawableElements = [
				...imageDrawFunctions
					.filter((item) => item.ready)
					.map(({ image, img }) => ({
						type: "image",
						element: image,
						img,
						zIndex: image.styles?.zIndex || 1,
					})),
				...texts.map((txt) => ({
					type: "text",
					element: txt,
					zIndex: txt.styles?.zIndex || 2,
				})),
				...shapes.map((shape) => ({
					type: "shape",
					element: shape,
					zIndex: shape.styles?.zIndex || 1,
				})),
			].sort((a, b) => a.zIndex - b.zIndex);

			// Draw all elements in z-index order
			allDrawableElements.forEach(({ type, element, img }) => {
				if (type === "image") {
					const image = element;
					const scaledX = (image.x / 100) * width - (image.width * scaleX) / 2;
					const scaledY =
						(image.y / 100) * height - (image.height * scaleY) / 2;
					const scaledWidth = image.width * scaleX;
					const scaledHeight = image.height * scaleY;
					const styles = image.styles || {};

					// Save context
					ctx.save();

					// Set opacity
					ctx.globalAlpha = styles.opacity !== undefined ? styles.opacity : 1;

					// Create clipping path for border-radius
					if (styles.borderRadius && styles.borderRadius > 0) {
						const borderRadius = styles.borderRadius * scaleY;
						drawRoundedRect(
							ctx,
							scaledX,
							scaledY,
							scaledWidth,
							scaledHeight,
							borderRadius
						);
						ctx.clip();
					}

					// Draw shadow if exists
					if (styles.shadow && styles.shadow !== "none") {
						ctx.save();
						ctx.globalAlpha = 0.3;
						ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
						let shadowBlur = 0;
						let shadowY = 0;
						switch (styles.shadow) {
							case "sm":
								shadowBlur = 2 * scaleY;
								shadowY = 1 * scaleY;
								break;
							case "md":
								shadowBlur = 4 * scaleY;
								shadowY = 2 * scaleY;
								break;
							case "lg":
								shadowBlur = 10 * scaleY;
								shadowY = 4 * scaleY;
								break;
							case "xl":
								shadowBlur = 20 * scaleY;
								shadowY = 10 * scaleY;
								break;
							case "2xl":
								shadowBlur = 25 * scaleY;
								shadowY = 12 * scaleY;
								break;
						}
						if (shadowBlur > 0) {
							ctx.filter = `blur(${shadowBlur}px)`;
							const shadowRadius = (styles.borderRadius || 0) * scaleY;
							drawRoundedRect(
								ctx,
								scaledX,
								scaledY + shadowY,
								scaledWidth,
								scaledHeight,
								shadowRadius
							);
							ctx.fill();
							ctx.filter = "none";
						}
						ctx.restore();
					}

					// Draw ring (outline) if exists - draw before image
					if (styles.ringWidth && styles.ringWidth > 0) {
						const ringWidth = styles.ringWidth * scaleY;
						const ringColor = styles.ringColor || "#3b82f6";
						const ringOffset = 2 * scaleY;
						const ringRadius =
							(styles.borderRadius || 0) * scaleY + ringOffset + ringWidth;
						ctx.strokeStyle = ringColor;
						ctx.lineWidth = ringWidth;
						drawRoundedRect(
							ctx,
							scaledX - ringOffset - ringWidth,
							scaledY - ringOffset - ringWidth,
							scaledWidth + (ringOffset + ringWidth) * 2,
							scaledHeight + (ringOffset + ringWidth) * 2,
							ringRadius
						);
						ctx.stroke();
					}

					// Draw image to temporary canvas for processing
					const tempCanvas = document.createElement("canvas");
					tempCanvas.width = scaledWidth;
					tempCanvas.height = scaledHeight;
					const tempCtx = tempCanvas.getContext("2d");

					// Handle object-fit
					if (styles.objectFit === "cover") {
						const imgAspect = img.width / img.height;
						const boxAspect = scaledWidth / scaledHeight;
						let drawWidth = scaledWidth;
						let drawHeight = scaledHeight;
						let drawX = 0;
						let drawY = 0;

						if (imgAspect > boxAspect) {
							drawHeight = scaledHeight;
							drawWidth = scaledHeight * imgAspect;
							drawX = (scaledWidth - drawWidth) / 2;
						} else {
							drawWidth = scaledWidth;
							drawHeight = scaledWidth / imgAspect;
							drawY = (scaledHeight - drawHeight) / 2;
						}
						tempCtx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
					} else if (styles.objectFit === "fill") {
						tempCtx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
					} else if (styles.objectFit === "none") {
						const imgScaledWidth = img.width * scaleX;
						const imgScaledHeight = img.height * scaleY;
						tempCtx.drawImage(img, 0, 0, imgScaledWidth, imgScaledHeight);
					} else if (styles.objectFit === "scale-down") {
						const imgAspect = img.width / img.height;
						const boxAspect = scaledWidth / scaledHeight;
						let drawWidth = Math.min(scaledWidth, img.width * scaleX);
						let drawHeight = Math.min(scaledHeight, img.height * scaleY);

						if (imgAspect > boxAspect) {
							drawHeight = drawWidth / imgAspect;
						} else {
							drawWidth = drawHeight * imgAspect;
						}
						const drawX = (scaledWidth - drawWidth) / 2;
						const drawY = (scaledHeight - drawHeight) / 2;
						tempCtx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
					} else {
						// contain (default)
						const imgAspect = img.width / img.height;
						const boxAspect = scaledWidth / scaledHeight;
						let drawWidth = scaledWidth;
						let drawHeight = scaledHeight;
						let drawX = 0;
						let drawY = 0;

						if (imgAspect > boxAspect) {
							drawHeight = scaledWidth / imgAspect;
							drawY = (scaledHeight - drawHeight) / 2;
						} else {
							drawWidth = scaledHeight * imgAspect;
							drawX = (scaledWidth - drawWidth) / 2;
						}
						tempCtx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
					}

					// Apply noise if enabled
					if (styles.noise?.enabled) {
						const imageData = tempCtx.getImageData(
							0,
							0,
							scaledWidth,
							scaledHeight
						);
						const data = imageData.data;
						const noiseIntensity = styles.noise.intensity || 0.3;

						for (let i = 0; i < data.length; i += 4) {
							const noise = (Math.random() - 0.5) * noiseIntensity * 50;
							data[i] = Math.max(0, Math.min(255, data[i] + noise)); // R
							data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)); // G
							data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)); // B
						}
						tempCtx.putImageData(imageData, 0, 0);
					}

					// Draw processed image to main canvas
					ctx.drawImage(tempCanvas, scaledX, scaledY);

					// Restore context (removes clipping)
					ctx.restore();

					// Draw border if exists (draw after image)
					if (styles.borderWidth && styles.borderWidth > 0) {
						const borderWidth = styles.borderWidth * scaleY;
						const borderColor = styles.borderColor || "#000000";
						const borderRadius = (styles.borderRadius || 0) * scaleY;

						ctx.strokeStyle = borderColor;
						ctx.lineWidth = borderWidth;

						if (styles.borderStyle === "dashed") {
							ctx.setLineDash([borderWidth * 3, borderWidth * 2]);
						} else if (styles.borderStyle === "dotted") {
							ctx.setLineDash([borderWidth, borderWidth]);
						} else {
							ctx.setLineDash([]);
						}

						drawRoundedRect(
							ctx,
							scaledX,
							scaledY,
							scaledWidth,
							scaledHeight,
							borderRadius
						);
						ctx.stroke();
						ctx.setLineDash([]);
					}

					// Draw caption if exists
					if (image.caption) {
						ctx.fillStyle = "black";
						ctx.font = `${16 * scaleY}px Arial`;
						ctx.textAlign = "center";
						ctx.fillText(
							image.caption,
							scaledX + scaledWidth / 2,
							scaledY + scaledHeight + 20 * scaleY
						);
					}
				} else if (type === "text") {
					const text = element;
					const scaledX = (text.x / 100) * width;
					const scaledY = (text.y / 100) * height;
					const scaledWidth = text.width * scaleX;
					const scaledHeight = text.height * scaleY;
					const styles = text.styles || {};

					// Save context
					ctx.save();

					// Set global alpha
					ctx.globalAlpha = styles.opacity !== undefined ? styles.opacity : 1;

					// Calculate text bounds with padding
					const padding = (styles.padding || 0) * scaleY;
					const textBoundsX = scaledX - scaledWidth / 2;
					const textBoundsY = scaledY - scaledHeight / 2;
					const textBoundsWidth = scaledWidth;
					const textBoundsHeight = scaledHeight;

					// Draw shadow if exists
					if (styles.shadow && styles.shadow !== "none") {
						ctx.save();
						ctx.globalAlpha = 0.3;
						ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
						let shadowBlur = 0;
						let shadowY = 0;
						switch (styles.shadow) {
							case "sm":
								shadowBlur = 2 * scaleY;
								shadowY = 1 * scaleY;
								break;
							case "md":
								shadowBlur = 4 * scaleY;
								shadowY = 2 * scaleY;
								break;
							case "lg":
								shadowBlur = 10 * scaleY;
								shadowY = 4 * scaleY;
								break;
							case "xl":
								shadowBlur = 20 * scaleY;
								shadowY = 10 * scaleY;
								break;
							case "2xl":
								shadowBlur = 25 * scaleY;
								shadowY = 12 * scaleY;
								break;
						}
						if (shadowBlur > 0) {
							ctx.filter = `blur(${shadowBlur}px)`;
							const borderRadius = (styles.borderRadius || 0) * scaleY;
							drawRoundedRect(
								ctx,
								textBoundsX,
								textBoundsY + shadowY,
								textBoundsWidth,
								textBoundsHeight,
								borderRadius
							);
							ctx.fill();
							ctx.filter = "none";
						}
						ctx.restore();
					}

					// Draw background if not transparent
					const borderRadius = (styles.borderRadius || 0) * scaleY;
					if (
						styles.backgroundColor &&
						styles.backgroundColor !== "transparent"
					) {
						ctx.fillStyle = styles.backgroundColor;
						drawRoundedRect(
							ctx,
							textBoundsX,
							textBoundsY,
							textBoundsWidth,
							textBoundsHeight,
							borderRadius
						);
						ctx.fill();
					}

					// Draw border if exists
					if (styles.borderWidth && styles.borderWidth > 0) {
						const borderWidth = styles.borderWidth * scaleY;
						const borderColor = styles.borderColor || "#000000";

						ctx.strokeStyle = borderColor;
						ctx.lineWidth = borderWidth;

						if (styles.borderStyle === "dashed") {
							ctx.setLineDash([borderWidth * 3, borderWidth * 2]);
						} else if (styles.borderStyle === "dotted") {
							ctx.setLineDash([borderWidth, borderWidth]);
						} else {
							ctx.setLineDash([]);
						}

						drawRoundedRect(
							ctx,
							textBoundsX,
							textBoundsY,
							textBoundsWidth,
							textBoundsHeight,
							borderRadius
						);
						ctx.stroke();
						ctx.setLineDash([]);
					}

					// Set text style
					const fontStyle = styles.fontStyle || "normal";
					const fontWeight = styles.fontWeight || "normal";
					const fontSize = (styles.fontSize || 24) * scaleY;
					const fontFamily = styles.fontFamily || "Arial";
					ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
					ctx.fillStyle = styles.color || "#000000";

					// Map text-align values
					let textAlign = styles.textAlign || "left";
					if (textAlign === "center") {
						ctx.textAlign = "center";
					} else if (textAlign === "right") {
						ctx.textAlign = "right";
					} else {
						ctx.textAlign = "left";
					}

					ctx.textBaseline = "middle";

					// Draw text with proper alignment
					const lines = text.content.split("\n");
					const lineHeight = fontSize * 1.2;
					const startY = scaledY - ((lines.length - 1) * lineHeight) / 2;

					lines.forEach((line, index) => {
						let lineX = scaledX;
						// Adjust X position based on text align when using left/right
						if (textAlign === "left") {
							lineX = textBoundsX + padding;
						} else if (textAlign === "right") {
							lineX = textBoundsX + textBoundsWidth - padding;
						}
						ctx.fillText(line, lineX, startY + index * lineHeight);
					});

					// Restore context
					ctx.restore();
				} else if (type === "shape") {
					const shape = element;
					const scaledX = (shape.x / 100) * width - (shape.width * scaleX) / 2;
					const scaledY =
						(shape.y / 100) * height - (shape.height * scaleY) / 2;
					const scaledWidth = shape.width * scaleX;
					const scaledHeight = shape.height * scaleY;
					const styles = shape.styles || {};

					ctx.save();
					ctx.globalAlpha = styles.opacity !== undefined ? styles.opacity : 1;

					// Draw shadow if exists
					if (styles.shadow && styles.shadow !== "none") {
						ctx.save();
						ctx.globalAlpha = 0.3;
						ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
						let shadowBlur = 0;
						let shadowY = 0;
						switch (styles.shadow) {
							case "sm":
								shadowBlur = 2 * scaleY;
								shadowY = 1 * scaleY;
								break;
							case "md":
								shadowBlur = 4 * scaleY;
								shadowY = 2 * scaleY;
								break;
							case "lg":
								shadowBlur = 10 * scaleY;
								shadowY = 4 * scaleY;
								break;
							case "xl":
								shadowBlur = 20 * scaleY;
								shadowY = 10 * scaleY;
								break;
							case "2xl":
								shadowBlur = 25 * scaleY;
								shadowY = 12 * scaleY;
								break;
						}
						if (shadowBlur > 0) {
							ctx.filter = `blur(${shadowBlur}px)`;
							if (shape.type === "rectangle" || shape.type === "square") {
								const shadowRadius = (styles.borderRadius || 0) * scaleY;
								drawRoundedRect(
									ctx,
									scaledX,
									scaledY + shadowY,
									scaledWidth,
									scaledHeight,
									shadowRadius
								);
								ctx.fill();
							} else if (shape.type === "triangle") {
								ctx.beginPath();
								ctx.moveTo(scaledX + scaledWidth / 2, scaledY + shadowY);
								ctx.lineTo(scaledX, scaledY + scaledHeight + shadowY);
								ctx.lineTo(
									scaledX + scaledWidth,
									scaledY + scaledHeight + shadowY
								);
								ctx.closePath();
								ctx.fill();
							} else if (shape.type === "line") {
								ctx.beginPath();
								ctx.moveTo(scaledX, scaledY + scaledHeight / 2 + shadowY);
								ctx.lineTo(
									scaledX + scaledWidth,
									scaledY + scaledHeight / 2 + shadowY
								);
								ctx.stroke();
							}
							ctx.filter = "none";
						}
						ctx.restore();
					}

					// Draw shape
					if (shape.type === "rectangle" || shape.type === "square") {
						const borderRadius = (styles.borderRadius || 0) * scaleY;
						ctx.fillStyle = styles.fillColor || "#3b82f6";
						drawRoundedRect(
							ctx,
							scaledX,
							scaledY,
							scaledWidth,
							scaledHeight,
							borderRadius
						);
						ctx.fill();

						if (styles.strokeWidth && styles.strokeWidth > 0) {
							ctx.strokeStyle = styles.strokeColor || "#1e40af";
							ctx.lineWidth = (styles.strokeWidth || 2) * scaleY;
							drawRoundedRect(
								ctx,
								scaledX,
								scaledY,
								scaledWidth,
								scaledHeight,
								borderRadius
							);
							ctx.stroke();
						}
					} else if (shape.type === "triangle") {
						ctx.fillStyle = styles.fillColor || "#3b82f6";
						ctx.beginPath();
						ctx.moveTo(scaledX + scaledWidth / 2, scaledY);
						ctx.lineTo(scaledX, scaledY + scaledHeight);
						ctx.lineTo(scaledX + scaledWidth, scaledY + scaledHeight);
						ctx.closePath();
						ctx.fill();

						if (styles.strokeWidth && styles.strokeWidth > 0) {
							ctx.strokeStyle = styles.strokeColor || "#1e40af";
							ctx.lineWidth = (styles.strokeWidth || 2) * scaleY;
							ctx.stroke();
						}
					} else if (shape.type === "line") {
						ctx.strokeStyle = styles.strokeColor || "#1e40af";
						ctx.lineWidth = (styles.strokeWidth || 2) * scaleY;
						ctx.beginPath();
						ctx.moveTo(scaledX, scaledY + scaledHeight / 2);
						ctx.lineTo(scaledX + scaledWidth, scaledY + scaledHeight / 2);
						ctx.stroke();
					}

					ctx.restore();
				}
			});
		};

		// Convert to blob and download
		const mimeType = format === "jpeg" ? "image/jpeg" : "image/png";
		const quality = format === "jpeg" ? 0.92 : undefined;

		// Draw all elements in z-index order
		drawAllElements().then(() => {
			// Ensure all elements are drawn, then export
			setTimeout(() => {
				canvas.toBlob(
					(blob) => {
						const url = URL.createObjectURL(blob);
						const link = document.createElement("a");
						link.href = url;
						link.download = `gradient-${dimensionType}-${width}x${height}-${Date.now()}.${format}`;
						document.body.appendChild(link);
						link.click();
						document.body.removeChild(link);
						URL.revokeObjectURL(url);
					},
					mimeType,
					quality
				);
			}, 100);
		});
	};

	// Export current gradient as base64 PNG for AI processing
	const exportGradientAsBase64 = async (dimensionType = previewFrameSize) => {
		return new Promise((resolve, reject) => {
			const dimensions =
				previewFramePresets[dimensionType] || previewFramePresets.mobile;
			const canvas = document.createElement("canvas");
			const width = dimensions.width;
			const height = dimensions.height;
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext("2d");

			// Create gradient based on type
			let gradientObj;
			const sortedStops = [...gradient.stops].sort((a, b) => {
				const distA = Math.sqrt(
					a.position.x * a.position.x + a.position.y * a.position.y
				);
				const distB = Math.sqrt(
					b.position.x * b.position.x + b.position.y * b.position.y
				);
				return distA - distB;
			});

			if (gradient.type === "linear") {
				const firstStop = sortedStops[0];
				const lastStop = sortedStops[sortedStops.length - 1];
				const angle =
					Math.atan2(
						lastStop.position.y - firstStop.position.y,
						lastStop.position.x - firstStop.position.x
					) *
					(180 / Math.PI);

				const radians = (angle * Math.PI) / 180;
				const x1 = width / 2 - (width / 2) * Math.cos(radians);
				const y1 = height / 2 - (width / 2) * Math.sin(radians);
				const x2 = width / 2 + (width / 2) * Math.cos(radians);
				const y2 = height / 2 + (width / 2) * Math.sin(radians);

				gradientObj = ctx.createLinearGradient(x1, y1, x2, y2);
				sortedStops.forEach((stop) => {
					const position = Math.round(stop.position.x) / 100;
					gradientObj.addColorStop(position, stop.color);
				});
			} else {
				gradientObj = ctx.createRadialGradient(
					width / 2,
					height / 2,
					0,
					width / 2,
					height / 2,
					Math.max(width, height) / 2
				);
				sortedStops.forEach((stop) => {
					const distance = Math.sqrt(
						Math.pow(stop.position.x - 50, 2) +
							Math.pow(stop.position.y - 50, 2)
					);
					const position = Math.round(distance) / 100;
					gradientObj.addColorStop(position, stop.color);
				});
			}

			ctx.fillStyle = gradientObj;
			ctx.fillRect(0, 0, width, height);

			// Draw all elements (reuse logic from downloadRaster)
			const drawAllElements = async () => {
				if (!previewRef.current) return;

				const previewActualHeight = previewRef.current.offsetHeight;
				const previewActualWidth = previewRef.current.offsetWidth;
				const scaleX = width / previewActualWidth;
				const scaleY = height / previewActualHeight;

				// Load all images
				const imageDrawFunctions = await Promise.all(
					images.map((image) => {
						return new Promise((resolve) => {
							const img = new Image();
							img.crossOrigin = "anonymous";
							img.onload = () => {
								resolve({ image, img, ready: true });
							};
							img.onerror = () => resolve({ image, img: null, ready: false });
							img.src = image.src;
						});
					})
				);

				// Combine all drawable elements and sort by z-index
				const allDrawableElements = [
					...imageDrawFunctions
						.filter((item) => item.ready)
						.map(({ image, img }) => ({
							type: "image",
							element: image,
							img,
							zIndex: image.styles?.zIndex || 1,
						})),
					...shapes.map((shape) => ({
						type: "shape",
						element: shape,
						zIndex: shape.styles?.zIndex || 1,
					})),
				].sort((a, b) => (a.zIndex || 1) - (b.zIndex || 1));

				// Draw elements
				allDrawableElements.forEach(({ type, element, img }) => {
					if (type === "image" && img) {
						const image = element;
						const scaledX =
							(image.x / 100) * width - (image.width * scaleX) / 2;
						const scaledY =
							(image.y / 100) * height - (image.height * scaleY) / 2;
						const scaledWidth = image.width * scaleX;
						const scaledHeight = image.height * scaleY;

						// Apply styles
						ctx.save();
						if (image.styles?.opacity !== undefined) {
							ctx.globalAlpha = image.styles.opacity;
						}

						// Handle object-fit
						let drawWidth = scaledWidth;
						let drawHeight = scaledHeight;
						let drawX = scaledX;
						let drawY = scaledY;

						if (image.styles?.objectFit === "cover") {
							const imgAspect = img.width / img.height;
							const targetAspect = scaledWidth / scaledHeight;
							if (imgAspect > targetAspect) {
								drawHeight = scaledWidth / imgAspect;
								drawY = scaledY + (scaledHeight - drawHeight) / 2;
							} else {
								drawWidth = scaledHeight * imgAspect;
								drawX = scaledX + (scaledWidth - drawWidth) / 2;
							}
						} else if (image.styles?.objectFit === "contain") {
							const imgAspect = img.width / img.height;
							const targetAspect = scaledWidth / scaledHeight;
							if (imgAspect > targetAspect) {
								drawHeight = scaledWidth / imgAspect;
								drawY = scaledY + (scaledHeight - drawHeight) / 2;
							} else {
								drawWidth = scaledHeight * imgAspect;
								drawX = scaledX + (scaledWidth - drawWidth) / 2;
							}
						}

						// Draw rounded rectangle if needed
						if (image.styles?.borderRadius > 0) {
							ctx.beginPath();
							drawRoundedRect(
								ctx,
								drawX,
								drawY,
								drawWidth,
								drawHeight,
								image.styles.borderRadius * scaleX
							);
							ctx.clip();
						}

						ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
						ctx.restore();
					} else if (type === "shape") {
						const shape = element;
						const scaledX =
							(shape.x / 100) * width - (shape.width * scaleX) / 2;
						const scaledY =
							(shape.y / 100) * height - (shape.height * scaleY) / 2;
						const scaledWidth = shape.width * scaleX;
						const scaledHeight = shape.height * scaleY;
						const styles = shape.styles || {};

						ctx.save();
						if (styles.opacity !== undefined) {
							ctx.globalAlpha = styles.opacity;
						}

						if (shape.type === "rectangle" || shape.type === "square") {
							ctx.fillStyle = styles.fillColor || "#3b82f6";
							ctx.strokeStyle = styles.strokeColor || "#1e40af";
							ctx.lineWidth = styles.strokeWidth || 2;
							const radius = (styles.borderRadius || 0) * scaleX;
							drawRoundedRect(
								ctx,
								scaledX,
								scaledY,
								scaledWidth,
								scaledHeight,
								radius
							);
							ctx.fill();
							if (styles.strokeWidth > 0) {
								ctx.stroke();
							}
						} else if (shape.type === "triangle") {
							ctx.fillStyle = styles.fillColor || "#3b82f6";
							ctx.strokeStyle = styles.strokeColor || "#1e40af";
							ctx.lineWidth = styles.strokeWidth || 2;
							ctx.beginPath();
							ctx.moveTo(scaledX + scaledWidth / 2, scaledY);
							ctx.lineTo(scaledX, scaledY + scaledHeight);
							ctx.lineTo(scaledX + scaledWidth, scaledY + scaledHeight);
							ctx.closePath();
							ctx.fill();
							if (styles.strokeWidth > 0) {
								ctx.stroke();
							}
						} else if (shape.type === "line") {
							ctx.strokeStyle = styles.strokeColor || "#1e40af";
							ctx.lineWidth = styles.strokeWidth || 2;
							ctx.beginPath();
							ctx.moveTo(scaledX, scaledY);
							ctx.lineTo(scaledX + scaledWidth, scaledY);
							ctx.stroke();
						}
						ctx.restore();
					}
				});
			};

			drawAllElements()
				.then(() => {
					// Convert to base64
					const base64 = canvas.toDataURL("image/png");
					resolve(base64);
				})
				.catch(reject);
		});
	};

	// AI Chat Functions
	const executeAIAction = useCallback(
		(action) => {
			if (!action || !action.type) return;

			const colorMap = {
				dark: "#1a1a1a",
				black: "#000000",
				light: "#f5f5f5",
				white: "#ffffff",
				blue: "#3b82f6",
				red: "#ef4444",
				zinc: "#10b981",
				yellow: "#fbbf24",
				purple: "#a855f7",
				pink: "#ec4899",
				orange: "#f97316",
				cyan: "#06b6d4",
				teal: "#14b8a6",
			};

			switch (action.type) {
				case "change_background_color": {
					const targetColor =
						action.color ||
						colorMap[action.colorName?.toLowerCase()] ||
						(action.colorName?.startsWith("#") ? action.colorName : "#1a1a1a");

					setGradient((prev) => ({
						...prev,
						stops: prev.stops.map((stop) => ({
							...stop,
							color: targetColor,
						})),
					}));
					break;
				}

				case "change_gradient_type": {
					const validTypes = [
						"linear",
						"radial",
						"conic",
						"rectangle",
						"ellipse",
						"polygon",
						"mesh",
					];
					if (validTypes.includes(action.gradientType)) {
						setGradient((prev) => ({
							...prev,
							type: action.gradientType,
						}));
					}
					break;
				}

				case "add_color_stop": {
					addColorStop();
					if (action.color || action.colorName) {
						setTimeout(() => {
							const newStop = gradient.stops[gradient.stops.length - 1];
							if (newStop) {
								const stopColor =
									action.color ||
									colorMap[action.colorName?.toLowerCase()] ||
									"#10b981";
								updateColorStop(newStop.id, "color", stopColor);
							}
						}, 100);
					}
					break;
				}

				case "remove_color_stop": {
					if (action.colorStopId && gradient.stops.length > 2) {
						removeColorStop(action.colorStopId);
					}
					break;
				}

				case "modify_color_stop": {
					if (action.colorStopId) {
						if (action.color || action.colorName) {
							const stopColor =
								action.color ||
								colorMap[action.colorName?.toLowerCase()] ||
								gradient.stops.find((s) => s.id === action.colorStopId)?.color;
							if (stopColor) {
								updateColorStop(action.colorStopId, "color", stopColor);
							}
						}
						if (action.colorStopPosition) {
							updateColorStop(
								action.colorStopId,
								"position",
								action.colorStopPosition
							);
						}
					}
					break;
				}

				case "add_image": {
					fileInputRef.current?.click();
					break;
				}

				case "add_video": {
					videoInputRef.current?.click();
					break;
				}

				case "add_text": {
					const newTextId = Date.now() + Math.random();
					const newText = {
						id: newTextId,
						content: action.textContent || "New Text",
						x: 50,
						y: 50,
						width: 200,
						height: 50,
						styles: {
							fontSize: 24,
							fontWeight: "normal",
							fontStyle: "normal",
							color: "#000000",
							textAlign: "left",
							fontFamily: "Arial",
							backgroundColor: "transparent",
							padding: 0,
							borderRadius: 0,
							borderWidth: 0,
							borderColor: "#000000",
							borderStyle: "solid",
							shadow: "none",
							opacity: 1,
							zIndex: 2,
						},
					};
					setTexts((prev) => [...prev, newText]);
					setSelectedText(newTextId);
					setTextEditing(newTextId);
					break;
				}

				case "modify_text": {
					const textId = action.textId || selectedText;
					if (textId) {
						const text = texts.find((t) => t.id === textId);
						if (text) {
							const updates = {
								styles: { ...text.styles },
							};

							if (action.fontSize)
								updates.styles.fontSize = parseInt(action.fontSize);
							if (action.textColor) updates.styles.color = action.textColor;
							if (action.textContent) updates.content = action.textContent;
							if (action.fontWeight)
								updates.styles.fontWeight = action.fontWeight;
							if (action.fontStyle) updates.styles.fontStyle = action.fontStyle;
							if (action.fontFamily)
								updates.styles.fontFamily = action.fontFamily;
							if (action.textAlign) updates.styles.textAlign = action.textAlign;
							if (action.backgroundColor)
								updates.styles.backgroundColor = action.backgroundColor;
							if (action.padding !== undefined)
								updates.styles.padding = action.padding;
							if (action.borderRadius !== undefined)
								updates.styles.borderRadius = action.borderRadius;
							if (action.borderWidth !== undefined)
								updates.styles.borderWidth = action.borderWidth;
							if (action.borderColor)
								updates.styles.borderColor = action.borderColor;

							updateText(textId, updates);
						}
					}
					break;
				}

				case "delete_text": {
					const textId = action.textId || selectedText;
					if (textId) {
						removeText(textId);
					}
					break;
				}

				case "modify_image": {
					const imageId = action.elementId || selectedImage;
					if (imageId) {
						const image = images.find((img) => img.id === imageId);
						if (image) {
							const updates = {
								styles: { ...image.styles },
							};

							if (action.objectFit) updates.styles.objectFit = action.objectFit;
							if (action.opacity !== undefined)
								updates.styles.opacity = action.opacity;
							if (action.shadow) updates.styles.shadow = action.shadow;
							if (action.ringWidth !== undefined)
								updates.styles.ringWidth = action.ringWidth;
							if (action.ringColor) updates.styles.ringColor = action.ringColor;
							if (action.borderRadius !== undefined) {
								updates.styles.borderRadius = action.borderRadius;
							}
							if (action.borderWidth !== undefined)
								updates.styles.borderWidth = action.borderWidth;
							if (action.borderColor)
								updates.styles.borderColor = action.borderColor;
							if (action.position) {
								updates.x = action.position.x;
								updates.y = action.position.y;
							}
							if (action.size) {
								updates.width = action.size.width;
								updates.height = action.size.height;
							}

							updateImage(imageId, updates);
						} else {
							console.log("Image not found:", imageId);
						}
					} else {
						console.log("No image ID provided for modify_image");
					}
					break;
				}

				case "delete_image": {
					const imageId = action.elementId || selectedImage;
					if (imageId) {
						removeImage(imageId);
					}
					break;
				}

				case "modify_video": {
					const videoId = action.elementId || selectedVideo;
					if (videoId) {
						const video = videos.find((vid) => vid.id === videoId);
						if (video) {
							const updates = {
								styles: { ...video.styles },
							};

							if (action.objectFit) updates.styles.objectFit = action.objectFit;
							if (action.opacity !== undefined)
								updates.styles.opacity = action.opacity;
							if (action.shadow) updates.styles.shadow = action.shadow;
							if (action.ringWidth !== undefined)
								updates.styles.ringWidth = action.ringWidth;
							if (action.ringColor) updates.styles.ringColor = action.ringColor;
							if (action.borderRadius !== undefined)
								updates.styles.borderRadius = action.borderRadius;
							if (action.borderWidth !== undefined)
								updates.styles.borderWidth = action.borderWidth;
							if (action.borderColor)
								updates.styles.borderColor = action.borderColor;
							if (action.position) {
								updates.x = action.position.x;
								updates.y = action.position.y;
							}
							if (action.size) {
								updates.width = action.size.width;
								updates.height = action.size.height;
							}

							updateVideo(videoId, updates);
						}
					}
					break;
				}

				case "delete_video": {
					const videoId = action.elementId || selectedVideo;
					if (videoId) {
						removeVideo(videoId);
					}
					break;
				}

				case "change_animation": {
					setGradient((prev) => ({
						...prev,
						animation: {
							...prev.animation,
							enabled:
								action.animationEnabled !== undefined
									? action.animationEnabled
									: prev.animation.enabled,
							type: action.animationType || prev.animation.type,
							duration: action.animationDuration || prev.animation.duration,
						},
					}));
					break;
				}

				case "change_background_animation": {
					setGradient((prev) => ({
						...prev,
						backgroundAnimation: {
							...prev.backgroundAnimation,
							enabled:
								action.backgroundAnimationEnabled !== undefined
									? action.backgroundAnimationEnabled
									: prev.backgroundAnimation.enabled,
							type:
								action.backgroundAnimationType || prev.backgroundAnimation.type,
							direction:
								action.backgroundAnimationDirection ||
								prev.backgroundAnimation.direction,
							speed:
								action.backgroundAnimationSpeed ||
								prev.backgroundAnimation.speed,
						},
					}));
					break;
				}

				case "toggle_animation": {
					setGradient((prev) => ({
						...prev,
						animation: {
							...prev.animation,
							enabled: action.animationEnabled ?? !prev.animation.enabled,
						},
					}));
					break;
				}

				case "change_frame_size": {
					if (action.frameSize && previewFramePresets[action.frameSize]) {
						const frame = previewFramePresets[action.frameSize];
						setPreviewFrameSize(action.frameSize);
						setGradient((prev) => ({
							...prev,
							dimensions: {
								width: frame.width,
								height: frame.height,
							},
						}));
					}
					break;
				}

				case "change_noise": {
					setGradient((prev) => ({
						...prev,
						noise: {
							enabled:
								action.noiseEnabled !== undefined
									? action.noiseEnabled
									: prev.noise.enabled,
							intensity:
								action.noiseIntensity !== undefined
									? action.noiseIntensity
									: prev.noise.intensity,
						},
					}));
					break;
				}

				case "modify_element_position": {
					const elementId = action.elementId;
					if (elementId && action.position) {
						if (action.elementType === "text") {
							updateText(elementId, {
								x: action.position.x,
								y: action.position.y,
							});
						} else if (action.elementType === "image") {
							updateImage(elementId, {
								x: action.position.x,
								y: action.position.y,
							});
						} else if (action.elementType === "video") {
							updateVideo(elementId, {
								x: action.position.x,
								y: action.position.y,
							});
						}
					}
					break;
				}

				case "modify_element_size": {
					const elementId = action.elementId;
					if (elementId && action.size) {
						if (action.elementType === "text") {
							updateText(elementId, {
								width: action.size.width,
								height: action.size.height,
							});
						} else if (action.elementType === "image") {
							updateImage(elementId, {
								width: action.size.width,
								height: action.size.height,
							});
						} else if (action.elementType === "video") {
							updateVideo(elementId, {
								width: action.size.width,
								height: action.size.height,
							});
						}
					}
					break;
				}

				case "modify_element_style": {
					const elementId = action.elementId;
					if (elementId) {
						if (action.elementType === "text") {
							const text = texts.find((t) => t.id === elementId);
							if (text) {
								const styleUpdates = {};
								if (action.fontSize) styleUpdates.fontSize = action.fontSize;
								if (action.textColor) styleUpdates.color = action.textColor;
								if (action.fontWeight)
									styleUpdates.fontWeight = action.fontWeight;
								if (action.fontStyle) styleUpdates.fontStyle = action.fontStyle;
								if (action.fontFamily)
									styleUpdates.fontFamily = action.fontFamily;
								if (action.textAlign) styleUpdates.textAlign = action.textAlign;
								if (action.backgroundColor)
									styleUpdates.backgroundColor = action.backgroundColor;
								if (action.padding !== undefined)
									styleUpdates.padding = action.padding;
								if (action.borderRadius !== undefined)
									styleUpdates.borderRadius = action.borderRadius;
								if (action.borderWidth !== undefined)
									styleUpdates.borderWidth = action.borderWidth;
								if (action.borderColor)
									styleUpdates.borderColor = action.borderColor;
								if (action.opacity !== undefined)
									styleUpdates.opacity = action.opacity;

								updateText(elementId, {
									styles: { ...text.styles, ...styleUpdates },
								});
							}
						} else if (action.elementType === "image") {
							const image = images.find((img) => img.id === elementId);
							if (image) {
								const styleUpdates = {};
								if (action.objectFit) styleUpdates.objectFit = action.objectFit;
								if (action.opacity !== undefined)
									styleUpdates.opacity = action.opacity;
								if (action.shadow) styleUpdates.shadow = action.shadow;
								if (action.ringWidth !== undefined)
									styleUpdates.ringWidth = action.ringWidth;
								if (action.ringColor) styleUpdates.ringColor = action.ringColor;
								if (action.borderRadius !== undefined)
									styleUpdates.borderRadius = action.borderRadius;
								if (action.borderWidth !== undefined)
									styleUpdates.borderWidth = action.borderWidth;
								if (action.borderColor)
									styleUpdates.borderColor = action.borderColor;

								updateImage(elementId, {
									styles: { ...image.styles, ...styleUpdates },
								});
							}
						} else if (action.elementType === "video") {
							const video = videos.find((vid) => vid.id === elementId);
							if (video) {
								const styleUpdates = {};
								if (action.objectFit) styleUpdates.objectFit = action.objectFit;
								if (action.opacity !== undefined)
									styleUpdates.opacity = action.opacity;
								if (action.shadow) styleUpdates.shadow = action.shadow;
								if (action.ringWidth !== undefined)
									styleUpdates.ringWidth = action.ringWidth;
								if (action.ringColor) styleUpdates.ringColor = action.ringColor;
								if (action.borderRadius !== undefined)
									styleUpdates.borderRadius = action.borderRadius;
								if (action.borderWidth !== undefined)
									styleUpdates.borderWidth = action.borderWidth;
								if (action.borderColor)
									styleUpdates.borderColor = action.borderColor;

								updateVideo(elementId, {
									styles: { ...video.styles, ...styleUpdates },
								});
							}
						}
					}
					break;
				}

				case "select_element": {
					const elementId = action.elementId;
					if (elementId) {
						if (action.elementType === "text") {
							setSelectedText(elementId);
							setSelectedImage(null);
							setSelectedVideo(null);
						} else if (action.elementType === "image") {
							setSelectedImage(elementId);
							setSelectedText(null);
							setSelectedVideo(null);
						} else if (action.elementType === "video") {
							setSelectedVideo(elementId);
							setSelectedText(null);
							setSelectedImage(null);
						}
					}
					break;
				}

				case "add_shape": {
					if (action.shapeType) {
						const newShape = {
							id: Date.now() + Math.random(),
							type: action.shapeType,
							x: action.position?.x ?? action.x ?? 50,
							y: action.position?.y ?? action.y ?? 50,
							width:
								action.size?.width ??
								action.width ??
								(action.shapeType === "line"
									? 200
									: action.shapeType === "square"
										? 150
										: 200),
							height:
								action.size?.height ??
								action.height ??
								(action.shapeType === "line"
									? 2
									: action.shapeType === "square"
										? 150
										: 150),
							styles: {
								fillColor: action.fillColor || "#3b82f6",
								strokeColor: action.strokeColor || "#1e40af",
								strokeWidth: action.strokeWidth ?? 2,
								opacity: action.shapeOpacity ?? action.opacity ?? 1,
								borderRadius:
									action.shapeBorderRadius ?? action.borderRadius ?? 0,
								shadow: action.shapeShadow ?? action.shadow ?? "none",
								zIndex: action.shapeZIndex ?? action.zIndex ?? 1,
							},
						};
						setShapes((prev) => [...prev, newShape]);
						setSelectedShape(newShape.id);
					}
					break;
				}

				case "modify_shape": {
					const shapeId = action.shapeId || selectedShape;
					if (shapeId) {
						const shape = shapes.find((s) => s.id === shapeId);
						if (shape) {
							const updates = {
								styles: { ...shape.styles },
							};

							if (action.position?.x !== undefined || action.x !== undefined)
								updates.x = action.position?.x ?? action.x;
							if (action.position?.y !== undefined || action.y !== undefined)
								updates.y = action.position?.y ?? action.y;
							if (
								action.size?.width !== undefined ||
								action.width !== undefined
							)
								updates.width = action.size?.width ?? action.width;
							if (
								action.size?.height !== undefined ||
								action.height !== undefined
							)
								updates.height = action.size?.height ?? action.height;

							if (action.fillColor) updates.styles.fillColor = action.fillColor;
							if (action.strokeColor)
								updates.styles.strokeColor = action.strokeColor;
							if (action.strokeWidth !== undefined)
								updates.styles.strokeWidth = action.strokeWidth;
							if (
								action.shapeOpacity !== undefined ||
								action.opacity !== undefined
							)
								updates.styles.opacity = action.shapeOpacity ?? action.opacity;
							if (
								action.shapeBorderRadius !== undefined ||
								action.borderRadius !== undefined
							)
								updates.styles.borderRadius =
									action.shapeBorderRadius ?? action.borderRadius;
							if (action.shapeShadow)
								updates.styles.shadow = action.shapeShadow;
							if (
								action.shapeZIndex !== undefined ||
								action.zIndex !== undefined
							)
								updates.styles.zIndex = action.shapeZIndex ?? action.zIndex;

							updateShape(shapeId, updates);
						}
					}
					break;
				}

				case "delete_shape": {
					const shapeId = action.shapeId || selectedShape;
					if (shapeId) {
						removeShape(shapeId);
					}
					break;
				}

				default:
					console.log("Unknown action type:", action.type);
			}
		},
		[
			gradient.stops,
			selectedText,
			selectedImage,
			selectedVideo,
			texts,
			images,
			videos,
			previewFrameSize,
			addColorStop,
			removeColorStop,
			updateColorStop,
			addText,
			updateText,
			removeText,
			updateImage,
			removeImage,
			updateVideo,
			removeVideo,
			setGradient,
			setPreviewFrameSize,
			setSelectedText,
			setSelectedImage,
			setSelectedVideo,
			setSelectedShape,
			setTextEditing,
			setTexts,
			shapes,
			addShape,
			updateShape,
			removeShape,
			previewFramePresets,
		]
	);

	const handleAIPrompt = async (prompt) => {
		if (!prompt.trim() || isAILoading) return;

		const userMessage = {
			id: Date.now(),
			role: "user",
			content: prompt.trim(),
			timestamp: new Date().toISOString(),
		};

		setAiMessages((prev) => [...prev, userMessage]);
		setAiInput("");
		setIsAILoading(true);

		try {
			const response = await fetch("/api/gradient-ai-assistant", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt: prompt.trim(),
					currentState: {
						gradient: {
							type: gradient.type,
							stops: gradient.stops.map((s) => ({
								id: s.id,
								color: s.color,
								position: s.position,
							})),
							animation: gradient.animation,
							backgroundAnimation: gradient.backgroundAnimation,
						},
						images: images.length,
						texts: texts.length,
						videos: videos.length,
						selectedImage: selectedImage,
						selectedText: selectedText,
						selectedVideo: selectedVideo,
						previewFrameSize: previewFrameSize,
					},
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to process AI request");
			}

			const data = await response.json();

			// Handle multi-step actions
			if (data.actions && data.actions.length > 1 && data.stepByStep) {
				setAiMultiStepActions(data.actions);
				setAiCurrentStep(0);
				setAiCompletedSteps(new Set());
				setIsExecutingSteps(false);

				const assistantMessage = {
					id: Date.now() + 1,
					role: "assistant",
					content:
						data.response ||
						"I'll execute this in multiple steps. Review the steps below and click 'Execute All' to proceed.",
					timestamp: new Date().toISOString(),
					hasSteps: true,
				};

				setAiMessages((prev) => [...prev, assistantMessage]);
			}
			// Handle single action
			else if (data.action) {
				if (aiActionsEnabled) {
					executeAIAction(data.action);
				} else {
					const assistantMessage2 = {
						id: Date.now() + 2,
						role: "assistant",
						content: `[Action disabled] Would have executed: ${data.action.type}`,
						timestamp: new Date().toISOString(),
					};
					setAiMessages((prev) => [...prev, assistantMessage2]);
				}

				const assistantMessage = {
					id: Date.now() + 1,
					role: "assistant",
					content: data.response || "I've made that change for you!",
					timestamp: new Date().toISOString(),
				};

				setAiMessages((prev) => [...prev, assistantMessage]);
			} else {
				const assistantMessage = {
					id: Date.now() + 1,
					role: "assistant",
					content:
						data.response ||
						"I understand, but I need more information to complete that request.",
					timestamp: new Date().toISOString(),
				};
				setAiMessages((prev) => [...prev, assistantMessage]);
			}
		} catch (error) {
			console.error("AI Error:", error);
			const errorMessage = {
				id: Date.now() + 1,
				role: "assistant",
				content: "Sorry, I couldn't process that request. Please try again.",
				timestamp: new Date().toISOString(),
			};
			setAiMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsAILoading(false);
		}
	};

	// Execute multi-step actions sequentially
	const executeMultiStepActions = useCallback(async () => {
		if (!aiActionsEnabled || aiMultiStepActions.length === 0) return;

		setIsExecutingSteps(true);
		setAiCurrentStep(0);
		setAiCompletedSteps(new Set());

		for (let i = 0; i < aiMultiStepActions.length; i++) {
			const action = aiMultiStepActions[i];
			setAiCurrentStep(i + 1);

			// Execute action
			executeAIAction(action);

			// Mark as completed
			setAiCompletedSteps((prev) => new Set([...prev, i]));

			// Small delay between steps for visual feedback
			await new Promise((resolve) => setTimeout(resolve, 300));
		}

		setIsExecutingSteps(false);
		setAiCurrentStep(0);

		// Add completion message
		const completionMessage = {
			id: Date.now() + 1,
			role: "assistant",
			content: `✅ All ${aiMultiStepActions.length} steps completed successfully!`,
			timestamp: new Date().toISOString(),
		};
		setAiMessages((prev) => [...prev, completionMessage]);
	}, [aiMultiStepActions, aiActionsEnabled, executeAIAction]);

	// Auto-focus chat input when opened
	useEffect(() => {
		if (isAIChatOpen && aiChatInputRef.current) {
			setTimeout(() => {
				aiChatInputRef.current?.focus();
			}, 100);
		}
	}, [isAIChatOpen]);

	// Image improvement mutation
	const generateImprovedImages = useMutation({
		mutationFn: async ({ imageBase64, prompt }) => {
			const response = await fetch("/api/generate-improved-images", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					imageBase64,
					prompt,
				}),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to generate images");
			}

			return response.json();
		},
		onSuccess: (data) => {
			setGeneratedImages(data.images || []);
		},
		onError: (error) => {
			console.error("Error generating images:", error);
			alert(error.message || "Failed to generate images. Please try again.");
		},
	});

	const handleGenerateImages = async () => {
		if (!improvementPrompt.trim()) {
			alert("Please enter a prompt");
			return;
		}

		try {
			const base64Image = await exportGradientAsBase64();
			generateImprovedImages.mutate({
				imageBase64: base64Image,
				prompt: improvementPrompt.trim(),
			});
		} catch (error) {
			console.error("Error exporting gradient:", error);
			alert("Failed to export gradient. Please try again.");
		}
	};

	// Auto-focus improvement prompt when modal opens
	useEffect(() => {
		if (isImageImprovementOpen && improvementPromptRef.current) {
			setTimeout(() => {
				improvementPromptRef.current?.focus();
			}, 100);
		}
	}, [isImageImprovementOpen]);

	// Auto-focus URL input when modal opens
	useEffect(() => {
		if (isUrlScreenshotOpen && urlInputRef.current) {
			setTimeout(() => {
				urlInputRef.current?.focus();
			}, 100);
		}
	}, [isUrlScreenshotOpen]);

	// Handle URL screenshot
	const handleUrlScreenshot = async () => {
		if (!urlInput.trim()) {
			alert("Please enter a URL");
			return;
		}

		// Validate URL
		try {
			new URL(urlInput.trim());
		} catch (e) {
			alert("Please enter a valid URL (e.g., https://example.com)");
			return;
		}

		setIsScreenshotLoading(true);
		setScreenshotImage(null);

		try {
			const response = await fetch("/api/url-to-screenshot", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					url: urlInput.trim(),
				}),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to generate screenshot");
			}

			const data = await response.json();
			console.log("Screenshot response:", {
				success: data.success,
				hasImage: !!data.image,
				hasScreenshot: !!data.screenshot,
			});

			// Use screenshot URL from external API (or fallback to image)
			const screenshotUrl = data.screenshot || data.image;
			if (screenshotUrl) {
				setScreenshotImage(screenshotUrl);
			} else {
				throw new Error("No screenshot URL in response");
			}
		} catch (error) {
			console.error("Error generating screenshot:", error);
			alert(
				error.message || "Failed to generate screenshot. Please try again."
			);
		} finally {
			setIsScreenshotLoading(false);
		}
	};

	// Add screenshot to canvas
	const handleAddScreenshotToCanvas = () => {
		if (!screenshotImage) return;

		// Create a temporary image to get dimensions
		const img = new Image();
		img.crossOrigin = "anonymous"; // Handle CORS for external images
		img.onload = () => {
			const newImage = {
				id: Date.now() + Math.random(),
				src: screenshotImage, // This is now a URL, not base64
				x: 50, // Center
				y: 50, // Center
				width: Math.min(img.width, 600), // Limit max width
				height: Math.min(img.height, 400), // Limit max height
				styles: {
					objectFit: "contain",
					opacity: 1,
					shadow: "none",
					ringWidth: 0,
					ringColor: "#000000",
					borderRadius: 0,
					borderWidth: 0,
					borderColor: "#000000",
					borderStyle: "solid",
					zIndex: 2,
				},
			};

			setImages((prev) => [...prev, newImage]);
			setSelectedImage(newImage.id);
			setIsUrlScreenshotOpen(false);
			setUrlInput("");
			setScreenshotImage(null);
		};
		img.onerror = () => {
			alert("Failed to load screenshot image. Please try again.");
		};
		img.src = screenshotImage;
	};

	// Sync modal with current frame size when opened or when frame size changes
	useEffect(() => {
		if (isModalOpen) {
			// Ensure modal reflects the current frame size
			const frame = previewFramePresets[previewFrameSize];
			if (frame) {
				setGradient((prev) => {
					// Only update if dimensions don't match
					if (
						prev.dimensions.width !== frame.width ||
						prev.dimensions.height !== frame.height
					) {
						return {
							...prev,
							dimensions: {
								width: frame.width,
								height: frame.height,
							},
						};
					}
					return prev;
				});
			}
		}
	}, [isModalOpen, previewFrameSize]);

	const { animation, backgroundAnimation } = useMemo(
		() => generateAnimationCSS(),
		[gradient]
	);
	const { containerStyle, overlayStyle } = useMemo(
		() => getModalStyles(),
		[gradient, isPlaying]
	);

	// Handle click outside download dropdown
	const handleDownloadDropdownClickOutside = useCallback((event) => {
		if (
			downloadDropdownRef.current &&
			!downloadDropdownRef.current.contains(event.target)
		) {
			setIsDownloadDropdownOpen(false);
		}
	}, []);

	useEffect(() => {
		if (isDownloadDropdownOpen) {
			document.addEventListener(
				"mousedown",
				handleDownloadDropdownClickOutside
			);
			return () =>
				document.removeEventListener(
					"mousedown",
					handleDownloadDropdownClickOutside
				);
		}
	}, [isDownloadDropdownOpen, handleDownloadDropdownClickOutside]);

	// Keyboard shortcuts for adding elements
	useEffect(() => {
		const handleKeyDown = (event) => {
			// Don't trigger shortcuts if user is typing in an input, textarea, or when AI chat is open
			const target = event.target;
			const isTyping =
				target.tagName === "INPUT" ||
				target.tagName === "TEXTAREA" ||
				target.isContentEditable ||
				isAIChatOpen;

			if (isTyping) {
				return;
			}

			// Check if modifier keys are pressed (we want pure key presses)
			if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) {
				return;
			}

			const key = event.key.toLowerCase();

			// Handle Delete and Backspace keys for removing selected elements
			if (key === "delete" || key === "backspace") {
				if (selectedImage) {
					event.preventDefault();
					removeImage(selectedImage);
				} else if (selectedVideo) {
					event.preventDefault();
					removeVideo(selectedVideo);
				} else if (selectedText) {
					event.preventDefault();
					removeText(selectedText);
				} else if (selectedShape) {
					event.preventDefault();
					removeShape(selectedShape);
				}
				return;
			}

			switch (key) {
				case "r":
					// Add rectangle
					event.preventDefault();
					addShape("rectangle");
					break;
				case "s":
					// Add square
					event.preventDefault();
					addShape("square");
					break;
				case "i":
					// Add image
					event.preventDefault();
					fileInputRef.current?.click();
					break;
				case "v":
					// Add video
					event.preventDefault();
					videoInputRef.current?.click();
					break;
				case "l":
					// Add line
					event.preventDefault();
					addShape("line");
					break;
				case "a":
					// Add text
					event.preventDefault();
					addText();
					break;
				case "t":
					// Add triangle
					event.preventDefault();
					addShape("triangle");
					break;
				default:
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [
		addShape,
		addText,
		isAIChatOpen,
		selectedImage,
		selectedVideo,
		selectedText,
		selectedShape,
		removeImage,
		removeVideo,
		removeText,
		removeShape,
	]);

	// Calculate modal preview dimensions based on frame size
	const modalDimensions = useMemo(() => {
		const { width: frameWidth, height: frameHeight } = gradient.dimensions;
		const aspectRatio = frameWidth / frameHeight;

		// Use CSS to size based on aspect ratio
		// For landscape/square: prioritize width constraint
		// For portrait: prioritize height constraint
		if (aspectRatio >= 1) {
			// Landscape or square - set width and let aspectRatio handle height
			return {
				width: "90vw",
				maxWidth: "90vw",
				maxHeight: "90vh",
			};
		} else {
			// Portrait - set height and let aspectRatio handle width
			return {
				height: "90vh",
				maxWidth: "90vw",
				maxHeight: "90vh",
			};
		}
	}, [gradient.dimensions, previewFrameSize]);

	return (
		<div className="min-h-screen bg-stone-100 p-6">
			<style jsx>{`
				.slider::-webkit-slider-thumb {
					appearance: none;
					height: 16px;
					width: 16px;
					border-radius: 50%;
					background: #71717a;
					cursor: pointer;
					border: 2px solid #ffffff;
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				}
				.slider::-moz-range-thumb {
					height: 16px;
					width: 16px;
					border-radius: 50%;
					background: #71717a;
					cursor: pointer;
					border: 2px solid #ffffff;
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				}

				/* Simple animations for modal */
				@keyframes slideRight {
					0% {
						background-position: 0% 0%;
					}
					100% {
						background-position: 100% 0%;
					}
				}
				@keyframes slideLeft {
					0% {
						background-position: 100% 0%;
					}
					100% {
						background-position: 0% 0%;
					}
				}
				@keyframes slideUp {
					0% {
						background-position: 0% 100%;
					}
					100% {
						background-position: 0% 0%;
					}
				}
				@keyframes slideDown {
					0% {
						background-position: 0% 0%;
					}
					100% {
						background-position: 0% 100%;
					}
				}
				@keyframes wave {
					0% {
						background-position: 0% 0%;
					}
					25% {
						background-position: 100% 0%;
					}
					50% {
						background-position: 100% 100%;
					}
					75% {
						background-position: 0% 100%;
					}
					100% {
						background-position: 0% 0%;
					}
				}
			`}</style>
			<div className="max-w-7xl mx-auto">
				{/* Header */}

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
					{/* Preview Section */}
					<div className="space-y-6 col-span-3">
						<div className="bg-white rounded-xl shadow-lg p-6">
							{/* Preview Header */}
							<div className="flex items-center justify-end gap-2 mb-4 flex-wrap">
								{/* Upload Image Button */}
								<button
									onClick={() => fileInputRef.current?.click()}
									className="flex items-center gap-2 px-3 py-1.5 text-sm bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors h-8"
									title="Upload images"
								>
									<Upload className="w-4 h-4" />
									Add Image
								</button>
								{/* Add Text Button */}
								<button
									onClick={addText}
									className="flex items-center gap-2 px-3 py-1.5 text-sm bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors h-8"
									title="Add text"
								>
									<Type className="w-4 h-4" />
									Add Text
								</button>
								{/* Add Video Button */}
								<button
									onClick={() => videoInputRef.current?.click()}
									className="flex items-center gap-2 px-3 py-1.5 text-sm bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors h-8"
									title="Upload videos"
								>
									<Video className="w-4 h-4" />
									Add Video
								</button>
								{/* URL Screenshot Button */}
								<button
									onClick={() => {
										setIsUrlScreenshotOpen(true);
										setUrlInput("");
										setScreenshotImage(null);
									}}
									className="flex items-center gap-2 px-3 py-1.5 text-sm bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors h-8"
									title="Take screenshot from URL"
								>
									<Camera className="w-4 h-4" />
									URL Screenshot
								</button>
								{/* Add Shape Dropdown */}
								<div ref={shapeDropdownRef} className="relative">
									<button
										onClick={() => setIsShapeDropdownOpen(!isShapeDropdownOpen)}
										className="flex items-center gap-2 px-3 py-1.5 text-sm bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors h-8"
										title="Add shapes"
									>
										<Square className="w-4 h-4" />
										Add Shape
										<ChevronDown
											className={`w-3 h-3 transition-transform ${
												isShapeDropdownOpen ? "rotate-180" : ""
											}`}
										/>
									</button>
									<AnimatePresence>
										{isShapeDropdownOpen && (
											<motion.div
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												transition={{ duration: 0.15 }}
												className="absolute z-50 mt-1 bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden min-w-[160px]"
											>
												<button
													type="button"
													onClick={() => addShape("rectangle")}
													className="w-full px-3 py-2 text-sm text-left hover:bg-zinc-50 transition-colors flex items-center gap-2"
												>
													<RectangleHorizontal className="w-4 h-4" />
													Rectangle
												</button>
												<button
													type="button"
													onClick={() => addShape("square")}
													className="w-full px-3 py-2 text-sm text-left hover:bg-zinc-50 transition-colors flex items-center gap-2 border-t border-zinc-100"
												>
													<Square className="w-4 h-4" />
													Square
												</button>
												<button
													type="button"
													onClick={() => addShape("line")}
													className="w-full px-3 py-2 text-sm text-left hover:bg-zinc-50 transition-colors flex items-center gap-2 border-t border-zinc-100"
												>
													<Minus className="w-4 h-4" />
													Line
												</button>
												<button
													type="button"
													onClick={() => addShape("triangle")}
													className="w-full px-3 py-2 text-sm text-left hover:bg-zinc-50 transition-colors flex items-center gap-2 border-t border-zinc-100"
												>
													<Triangle className="w-4 h-4" />
													Triangle
												</button>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
								{/* Frame Size Selector */}
								<div className="flex items-center">
									<Dropdown
										value={previewFrameSize}
										onChange={(value) => {
											setPreviewFrameSize(value);
											const frame = previewFramePresets[value];
											if (frame) {
												setGradient((prev) => ({
													...prev,
													dimensions: {
														width: frame.width,
														height: frame.height,
													},
												}));
											}
										}}
										options={Object.entries(previewFramePresets).map(
											([key, preset]) => ({
												value: key,
												label: `${preset.icon} ${preset.label} (${preset.width}×${preset.height})`,
											})
										)}
										placeholder="Select frame size"
										className="min-w-[180px]"
									/>
								</div>
								<input
									ref={fileInputRef}
									type="file"
									accept="image/*"
									multiple
									onChange={handleImageUpload}
									className="hidden"
								/>
								<input
									ref={videoInputRef}
									type="file"
									accept="video/*"
									multiple
									onChange={handleVideoUpload}
									className="hidden"
								/>
								<button
									onClick={() => setIsModalOpen(true)}
									className="flex items-center gap-2 px-3 py-1.5 text-sm bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors h-8"
								>
									<Maximize2 className="w-4 h-4" />
									Preview
								</button>
							</div>
							{/* Interactive Gradient Preview (Canvas) */}
							<div
								className="flex justify-center items-center w-full"
								style={{
									minHeight:
										gradient.dimensions.height > gradient.dimensions.width
											? "600px"
											: "400px",
								}}
							>
								<div
									ref={previewRef}
									className="relative rounded-xl overflow-hidden cursor-crosshair border-2 border-gray-200"
									style={{
										aspectRatio: `${gradient.dimensions.width} / ${gradient.dimensions.height}`,
										width: "100%",
										maxWidth: "100%",
										// Calculate maxHeight based on aspect ratio: for portrait frames, allow more height
										maxHeight:
											gradient.dimensions.height > gradient.dimensions.width
												? "90vh" // Portrait frames get more vertical space
												: "600px", // Landscape frames limited to 600px
										background: generateGradientCSS(),
										...(isPlaying &&
											gradient.backgroundAnimation.enabled && {
												backgroundSize: "200% 200%",
											}),
										...(isPlaying &&
											backgroundAnimation && {
												animation: backgroundAnimation,
											}),
									}}
									onClick={(e) => {
										// Deselect images, texts, videos, and shapes when clicking on canvas
										if (
											e.target === previewRef.current ||
											e.target.parentElement === previewRef.current
										) {
											setSelectedImage(null);
											setSelectedText(null);
											setSelectedVideo(null);
											setSelectedShape(null);
										}
									}}
								>
									{/* Element Animation Overlay */}
									<div
										className="absolute inset-0"
										style={{
											...(isPlaying && animation && { animation }),
										}}
									/>

									{/* Text Layer */}
									{texts.map((text) => (
										<div
											key={text.id}
											className={`absolute ${
												selectedText === text.id
													? "ring-2 ring-zinc-500"
													: "ring-2 ring-transparent"
											}`}
											style={{
												left: `${text.x}%`,
												top: `${text.y}%`,
												width: `${text.width}px`,
												minHeight: `${text.height}px`,
												transform: "translate(-50%, -50%)",
												zIndex: text.styles?.zIndex || 2,
											}}
											onMouseDown={(e) => handleTextMouseDown(e, text.id)}
										>
											{/* Text Content */}
											{textEditing === text.id ? (
												<textarea
													value={text.content}
													onChange={(e) =>
														updateText(text.id, { content: e.target.value })
													}
													onBlur={() => setTextEditing(null)}
													onKeyDown={(e) => {
														if (e.key === "Enter" && e.shiftKey === false) {
															e.preventDefault();
															setTextEditing(null);
														}
													}}
													className="w-full resize-none outline-none bg-transparent text-center"
													style={{
														fontSize: `${text.styles?.fontSize || 24}px`,
														fontWeight: text.styles?.fontWeight || "normal",
														fontStyle: text.styles?.fontStyle || "normal",
														color: text.styles?.color || "#000000",
														textAlign: text.styles?.textAlign || "left",
														fontFamily: text.styles?.fontFamily || "Arial",
														backgroundColor:
															text.styles?.backgroundColor === "transparent"
																? "rgba(255, 255, 255, 0.8)"
																: text.styles?.backgroundColor || "transparent",
														padding: `${text.styles?.padding || 0}px`,
														borderRadius:
															text.styles?.borderRadius === 100
																? "50%"
																: `${text.styles?.borderRadius || 0}px`,
														borderWidth: `${text.styles?.borderWidth || 0}px`,
														borderColor: text.styles?.borderColor || "#000000",
														borderStyle: text.styles?.borderStyle || "solid",
														opacity:
															text.styles?.opacity !== undefined
																? text.styles.opacity
																: 1,
														boxShadow:
															text.styles?.shadow === "none" ||
															!text.styles?.shadow
																? "none"
																: text.styles.shadow === "sm"
																	? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
																	: text.styles.shadow === "md"
																		? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
																		: text.styles.shadow === "lg"
																			? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
																			: text.styles.shadow === "xl"
																				? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
																				: text.styles.shadow === "2xl"
																					? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
																					: "none",
													}}
													autoFocus
												/>
											) : (
												<div
													className="cursor-move select-none"
													onDoubleClick={() => setTextEditing(text.id)}
													style={{
														fontSize: `${text.styles?.fontSize || 24}px`,
														fontWeight: text.styles?.fontWeight || "normal",
														fontStyle: text.styles?.fontStyle || "normal",
														color: text.styles?.color || "#000000",
														textAlign: text.styles?.textAlign || "left",
														fontFamily: text.styles?.fontFamily || "Arial",
														backgroundColor:
															text.styles?.backgroundColor || "transparent",
														padding: `${text.styles?.padding || 0}px`,
														borderRadius:
															text.styles?.borderRadius === 100
																? "50%"
																: `${text.styles?.borderRadius || 0}px`,
														borderWidth: `${text.styles?.borderWidth || 0}px`,
														borderColor: text.styles?.borderColor || "#000000",
														borderStyle: text.styles?.borderStyle || "solid",
														opacity:
															text.styles?.opacity !== undefined
																? text.styles.opacity
																: 1,
														boxShadow:
															text.styles?.shadow === "none" ||
															!text.styles?.shadow
																? "none"
																: text.styles.shadow === "sm"
																	? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
																	: text.styles.shadow === "md"
																		? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
																		: text.styles.shadow === "lg"
																			? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
																			: text.styles.shadow === "xl"
																				? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
																				: text.styles.shadow === "2xl"
																					? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
																					: "none",
														whiteSpace: "pre-wrap",
														wordWrap: "break-word",
													}}
												>
													{text.content}
												</div>
											)}

											{/* Text Controls */}
											{textEditing !== text.id && (
												<div className="absolute -top-2 -right-2 flex gap-1">
													{/* Delete Button */}
													<button
														onClick={(e) => {
															e.stopPropagation();
															removeText(text.id);
														}}
														className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg transition-colors z-10"
														title="Delete text"
													>
														<X className="w-3 h-3" />
													</button>
												</div>
											)}

											{/* Resize Handles */}
											{selectedText === text.id && textEditing !== text.id && (
												<>
													{/* Corner handles */}
													<div
														className="absolute top-0 left-0 w-3 h-3 bg-zinc-500 border border-white rounded-full cursor-nwse-resize"
														onMouseDown={(e) =>
															handleTextResizeStart(e, text.id, "nw")
														}
													/>
													<div
														className="absolute top-0 right-0 w-3 h-3 bg-zinc-500 border border-white rounded-full cursor-nesw-resize"
														onMouseDown={(e) =>
															handleTextResizeStart(e, text.id, "ne")
														}
													/>
													<div
														className="absolute bottom-0 left-0 w-3 h-3 bg-zinc-500 border border-white rounded-full cursor-nesw-resize"
														onMouseDown={(e) =>
															handleTextResizeStart(e, text.id, "sw")
														}
													/>
													<div
														className="absolute bottom-0 right-0 w-3 h-3 bg-zinc-500 border border-white rounded-full cursor-nwse-resize"
														onMouseDown={(e) =>
															handleTextResizeStart(e, text.id, "se")
														}
													/>
													{/* Edge handles */}
													<div
														className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-500 border border-white rounded-full cursor-ns-resize"
														onMouseDown={(e) =>
															handleTextResizeStart(e, text.id, "n")
														}
													/>
													<div
														className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-500 border border-white rounded-full cursor-ns-resize"
														onMouseDown={(e) =>
															handleTextResizeStart(e, text.id, "s")
														}
													/>
													<div
														className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-zinc-500 border border-white rounded-full cursor-ew-resize"
														onMouseDown={(e) =>
															handleTextResizeStart(e, text.id, "w")
														}
													/>
													<div
														className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-zinc-500 border border-white rounded-full cursor-ew-resize"
														onMouseDown={(e) =>
															handleTextResizeStart(e, text.id, "e")
														}
													/>
												</>
											)}
										</div>
									))}

									{/* Uploaded Images Layer */}
									{images.map((image) => (
										<div
											key={image.id}
											className={`absolute ${
												selectedImage === image.id
													? "ring-2 ring-blue-500"
													: "ring-2 ring-transparent"
											}`}
											style={{
												left: `${image.x}%`,
												top: `${image.y}%`,
												width: `${image.width}px`,
												height: `${image.height}px`,
												transform: "translate(-50%, -50%)",
												zIndex: image.styles?.zIndex || 1,
											}}
										>
											{/* Image Wrapper with overflow-hidden for border radius */}
											<div
												className="w-full h-full cursor-move"
												style={{
													borderRadius:
														image.styles?.borderRadius === 100
															? "50%"
															: `${image.styles?.borderRadius || 0}px`,
													overflow: "hidden",
													borderWidth: image.styles?.borderWidth || 0,
													borderColor: image.styles?.borderColor || "#000000",
													borderStyle: image.styles?.borderStyle || "solid",
													opacity:
														image.styles?.opacity !== undefined
															? image.styles.opacity
															: 1,
													boxShadow:
														image.styles?.shadow === "none" ||
														!image.styles?.shadow
															? "none"
															: image.styles.shadow === "sm"
																? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
																: image.styles.shadow === "md"
																	? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
																	: image.styles.shadow === "lg"
																		? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
																		: image.styles.shadow === "xl"
																			? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
																			: image.styles.shadow === "2xl"
																				? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
																				: "none",
													...(image.styles?.ringWidth > 0 && {
														outline: `${image.styles.ringWidth}px solid ${image.styles.ringColor}`,
														outlineOffset: "2px",
													}),
												}}
											>
												<img
													src={image.src}
													alt="Uploaded"
													className="w-full h-full"
													style={{
														objectFit: image.styles?.objectFit || "contain",
														...(image.styles?.noise?.enabled && {
															filter: `contrast(${
																1 + (image.styles.noise.intensity || 0.3) * 0.2
															}) brightness(${
																1 + (image.styles.noise.intensity || 0.3) * 0.1
															})`,
														}),
													}}
													onMouseDown={(e) => handleImageMouseDown(e, image.id)}
													draggable={false}
												/>
											</div>
											{/* Noise texture overlay for image only */}
											{image.styles?.noise?.enabled && (
												<div
													className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
													style={{
														backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter-${image.id}'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter-${image.id})'/%3E%3C/svg%3E")`,
														opacity: image.styles.noise.intensity || 0.3,
													}}
												/>
											)}
											{/* Image Controls */}
											<div className="absolute -top-2 -right-2 flex gap-1">
												{/* Reupload Image Button */}
												<button
													onClick={(e) => {
														e.stopPropagation();
														if (!imageReuploadRefs.current[image.id]) {
															imageReuploadRefs.current[image.id] =
																document.createElement("input");
															imageReuploadRefs.current[image.id].type = "file";
															imageReuploadRefs.current[image.id].accept =
																"image/*";
															imageReuploadRefs.current[
																image.id
															].style.display = "none";
															imageReuploadRefs.current[
																image.id
															].addEventListener("change", (evt) =>
																handleImageReupload(evt, image.id)
															);
															document.body.appendChild(
																imageReuploadRefs.current[image.id]
															);
														}
														imageReuploadRefs.current[image.id].click();
													}}
													className="w-6 h-6 bg-zinc-500 hover:bg-zinc-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg transition-colors z-10"
													title="Replace image"
												>
													<Upload className="w-3 h-3" />
												</button>
												{/* Object Fit Toggle Button */}
												<button
													onClick={(e) => {
														e.stopPropagation();
														toggleObjectFit(image.id);
													}}
													className="w-6 h-6 bg-purple-500 hover:bg-purple-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg transition-colors z-10"
													title={`Object Fit: ${image.styles?.objectFit || "contain"} (click to change)`}
												>
													<ImageIcon className="w-3 h-3" />
												</button>
												{/* Caption Button */}
												<button
													onClick={(e) => {
														e.stopPropagation();
														toggleCaption(image.id);
													}}
													className="w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg transition-colors z-10"
													title="Add caption"
												>
													<Type className="w-3 h-3" />
												</button>
												{/* Delete Button */}
												<button
													onClick={(e) => {
														e.stopPropagation();
														removeImage(image.id);
													}}
													className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg transition-colors z-10"
													title="Delete image"
												>
													<X className="w-3 h-3" />
												</button>
											</div>
											{/* Resize Handles */}
											{selectedImage === image.id && (
												<>
													{/* Corner handles */}
													<div
														className="absolute top-0 left-0 w-3 h-3 bg-blue-500 border border-white rounded-full cursor-nwse-resize"
														onMouseDown={(e) =>
															handleResizeStart(e, image.id, "nw")
														}
													/>
													<div
														className="absolute top-0 right-0 w-3 h-3 bg-blue-500 border border-white rounded-full cursor-nesw-resize"
														onMouseDown={(e) =>
															handleResizeStart(e, image.id, "ne")
														}
													/>
													<div
														className="absolute bottom-0 left-0 w-3 h-3 bg-blue-500 border border-white rounded-full cursor-nesw-resize"
														onMouseDown={(e) =>
															handleResizeStart(e, image.id, "sw")
														}
													/>
													<div
														className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 border border-white rounded-full cursor-nwse-resize"
														onMouseDown={(e) =>
															handleResizeStart(e, image.id, "se")
														}
													/>
													{/* Edge handles */}
													<div
														className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 border border-white rounded-full cursor-ns-resize"
														onMouseDown={(e) =>
															handleResizeStart(e, image.id, "n")
														}
													/>
													<div
														className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 border border-white rounded-full cursor-ns-resize"
														onMouseDown={(e) =>
															handleResizeStart(e, image.id, "s")
														}
													/>
													<div
														className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 border border-white rounded-full cursor-ew-resize"
														onMouseDown={(e) =>
															handleResizeStart(e, image.id, "w")
														}
													/>
													<div
														className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 border border-white rounded-full cursor-ew-resize"
														onMouseDown={(e) =>
															handleResizeStart(e, image.id, "e")
														}
													/>
												</>
											)}
											{/* Caption Input */}
											{captionEditing === image.id && (
												<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-20">
													<input
														type="text"
														value={image.caption || ""}
														onChange={(e) =>
															updateImage(image.id, { caption: e.target.value })
														}
														onBlur={() => setCaptionEditing(null)}
														onKeyDown={(e) => {
															if (e.key === "Enter") {
																setCaptionEditing(null);
															}
														}}
														className="px-2 py-1 text-xs bg-white border border-gray-300 rounded shadow-lg min-w-[100px]"
														placeholder="Add caption..."
														autoFocus
													/>
												</div>
											)}
											{/* Caption Display */}
											{image.caption && captionEditing !== image.id && (
												<div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black bg-opacity-75 px-2 py-1 rounded whitespace-nowrap">
													{image.caption}
												</div>
											)}
										</div>
									))}

									{/* Uploaded Videos Layer */}
									{videos.map((video) => (
										<div
											key={video.id}
											className={`absolute ${
												selectedVideo === video.id
													? "ring-2 ring-purple-500"
													: "ring-2 ring-transparent"
											}`}
											style={{
												left: `${video.x}%`,
												top: `${video.y}%`,
												width: `${video.width}px`,
												height: `${video.height}px`,
												transform: "translate(-50%, -50%)",
												zIndex: video.styles?.zIndex || 1,
											}}
										>
											{/* Video Wrapper with overflow-hidden for border radius */}
											<div
												className="w-full h-full cursor-move"
												style={{
													borderRadius:
														video.styles?.borderRadius === 100
															? "50%"
															: `${video.styles?.borderRadius || 0}px`,
													overflow: "hidden",
													borderWidth: video.styles?.borderWidth || 0,
													borderColor: video.styles?.borderColor || "#000000",
													borderStyle: video.styles?.borderStyle || "solid",
													opacity:
														video.styles?.opacity !== undefined
															? video.styles.opacity
															: 1,
													boxShadow:
														video.styles?.shadow === "none" ||
														!video.styles?.shadow
															? "none"
															: video.styles.shadow === "sm"
																? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
																: video.styles.shadow === "md"
																	? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
																	: video.styles.shadow === "lg"
																		? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
																		: video.styles.shadow === "xl"
																			? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
																			: video.styles.shadow === "2xl"
																				? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
																				: "none",
													...(video.styles?.ringWidth > 0 && {
														outline: `${video.styles.ringWidth}px solid ${video.styles.ringColor}`,
														outlineOffset: "2px",
													}),
												}}
											>
												<video
													src={video.src}
													className="w-full h-full"
													style={{
														objectFit: video.styles?.objectFit || "contain",
													}}
													onMouseDown={(e) => handleVideoMouseDown(e, video.id)}
													controls
													loop
													muted
													playsInline
												/>
											</div>
											{/* Video Controls */}
											<div className="absolute -top-2 -right-2 flex gap-1">
												{/* Reupload Video Button */}
												<button
													onClick={(e) => {
														e.stopPropagation();
														if (!videoReuploadRefs.current[video.id]) {
															videoReuploadRefs.current[video.id] =
																document.createElement("input");
															videoReuploadRefs.current[video.id].type = "file";
															videoReuploadRefs.current[video.id].accept =
																"video/*";
															videoReuploadRefs.current[
																video.id
															].style.display = "none";
															videoReuploadRefs.current[
																video.id
															].addEventListener("change", (evt) =>
																handleVideoReupload(evt, video.id)
															);
															document.body.appendChild(
																videoReuploadRefs.current[video.id]
															);
														}
														videoReuploadRefs.current[video.id].click();
													}}
													className="w-6 h-6 bg-zinc-500 hover:bg-zinc-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg transition-colors z-10"
													title="Replace video"
												>
													<Upload className="w-3 h-3" />
												</button>
												{/* Object Fit Toggle Button */}
												<button
													onClick={(e) => {
														e.stopPropagation();
														toggleVideoObjectFit(video.id);
													}}
													className="w-6 h-6 bg-purple-500 hover:bg-purple-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg transition-colors z-10"
													title={`Object Fit: ${video.styles?.objectFit || "contain"} (click to change)`}
												>
													<Video className="w-3 h-3" />
												</button>
												{/* Caption Button */}
												<button
													onClick={(e) => {
														e.stopPropagation();
														toggleVideoCaption(video.id);
													}}
													className="w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg transition-colors z-10"
													title="Add caption"
												>
													<Type className="w-3 h-3" />
												</button>
												{/* Delete Button */}
												<button
													onClick={(e) => {
														e.stopPropagation();
														removeVideo(video.id);
													}}
													className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg transition-colors z-10"
													title="Delete video"
												>
													<X className="w-3 h-3" />
												</button>
											</div>
											{/* Resize Handles */}
											{selectedVideo === video.id && (
												<>
													{/* Corner handles */}
													<div
														className="absolute top-0 left-0 w-3 h-3 bg-purple-500 border border-white rounded-full cursor-nwse-resize"
														onMouseDown={(e) =>
															handleVideoResizeStart(e, video.id, "nw")
														}
													/>
													<div
														className="absolute top-0 right-0 w-3 h-3 bg-purple-500 border border-white rounded-full cursor-nesw-resize"
														onMouseDown={(e) =>
															handleVideoResizeStart(e, video.id, "ne")
														}
													/>
													<div
														className="absolute bottom-0 left-0 w-3 h-3 bg-purple-500 border border-white rounded-full cursor-nesw-resize"
														onMouseDown={(e) =>
															handleVideoResizeStart(e, video.id, "sw")
														}
													/>
													<div
														className="absolute bottom-0 right-0 w-3 h-3 bg-purple-500 border border-white rounded-full cursor-nwse-resize"
														onMouseDown={(e) =>
															handleVideoResizeStart(e, video.id, "se")
														}
													/>
													{/* Edge handles */}
													<div
														className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-500 border border-white rounded-full cursor-ns-resize"
														onMouseDown={(e) =>
															handleVideoResizeStart(e, video.id, "n")
														}
													/>
													<div
														className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-500 border border-white rounded-full cursor-ns-resize"
														onMouseDown={(e) =>
															handleVideoResizeStart(e, video.id, "s")
														}
													/>
													<div
														className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-500 border border-white rounded-full cursor-ew-resize"
														onMouseDown={(e) =>
															handleVideoResizeStart(e, video.id, "w")
														}
													/>
													<div
														className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-500 border border-white rounded-full cursor-ew-resize"
														onMouseDown={(e) =>
															handleVideoResizeStart(e, video.id, "e")
														}
													/>
												</>
											)}
											{/* Caption Input */}
											{captionEditing === video.id && (
												<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-20">
													<input
														type="text"
														value={video.caption || ""}
														onChange={(e) =>
															updateVideo(video.id, { caption: e.target.value })
														}
														onBlur={() => setCaptionEditing(null)}
														onKeyDown={(e) => {
															if (e.key === "Enter") {
																setCaptionEditing(null);
															}
														}}
														className="px-2 py-1 text-xs bg-white border border-gray-300 rounded shadow-lg min-w-[100px]"
														placeholder="Add caption..."
														autoFocus
													/>
												</div>
											)}
											{/* Caption Display */}
											{video.caption && captionEditing !== video.id && (
												<div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black bg-opacity-75 px-2 py-1 rounded whitespace-nowrap">
													{video.caption}
												</div>
											)}
										</div>
									))}

									{/* Shapes Layer */}
									{shapes.map((shape) => {
										const ShapeIcon =
											shape.type === "rectangle"
												? RectangleHorizontal
												: shape.type === "square"
													? Square
													: shape.type === "triangle"
														? Triangle
														: Minus;

										return (
											<div
												key={shape.id}
												className={`absolute ${
													selectedShape === shape.id
														? "ring-2 ring-orange-500"
														: "ring-2 ring-transparent"
												}`}
												style={{
													left: `${shape.x}%`,
													top: `${shape.y}%`,
													width: `${shape.width}px`,
													height: `${shape.height}px`,
													transform: "translate(-50%, -50%)",
													zIndex: shape.styles?.zIndex || 1,
												}}
												onMouseDown={(e) => handleShapeMouseDown(e, shape.id)}
											>
												{/* Shape SVG */}
												<svg
													width="100%"
													height="100%"
													className="cursor-move"
													style={{
														opacity: shape.styles?.opacity || 1,
														filter:
															shape.styles?.shadow === "none" ||
															!shape.styles?.shadow
																? "none"
																: shape.styles.shadow === "sm"
																	? "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05))"
																	: shape.styles.shadow === "md"
																		? "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
																		: shape.styles.shadow === "lg"
																			? "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))"
																			: shape.styles.shadow === "xl"
																				? "drop-shadow(0 20px 25px rgba(0, 0, 0, 0.1))"
																				: shape.styles.shadow === "2xl"
																					? "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))"
																					: "none",
													}}
												>
													{shape.type === "rectangle" && (
														<rect
															x="0"
															y="0"
															width="100%"
															height="100%"
															fill={shape.styles?.fillColor || "#3b82f6"}
															stroke={shape.styles?.strokeColor || "#1e40af"}
															strokeWidth={shape.styles?.strokeWidth || 2}
															rx={shape.styles?.borderRadius || 0}
															ry={shape.styles?.borderRadius || 0}
														/>
													)}
													{shape.type === "square" && (
														<rect
															x="0"
															y="0"
															width="100%"
															height="100%"
															fill={shape.styles?.fillColor || "#3b82f6"}
															stroke={shape.styles?.strokeColor || "#1e40af"}
															strokeWidth={shape.styles?.strokeWidth || 2}
															rx={shape.styles?.borderRadius || 0}
															ry={shape.styles?.borderRadius || 0}
														/>
													)}
													{shape.type === "line" && (
														<line
															x1="0"
															y1="50%"
															x2="100%"
															y2="50%"
															stroke={shape.styles?.strokeColor || "#1e40af"}
															strokeWidth={shape.styles?.strokeWidth || 2}
														/>
													)}
													{shape.type === "triangle" && (
														<polygon
															points={`50%,0 0,100% 100%,100%`}
															fill={shape.styles?.fillColor || "#3b82f6"}
															stroke={shape.styles?.strokeColor || "#1e40af"}
															strokeWidth={shape.styles?.strokeWidth || 2}
														/>
													)}
												</svg>

												{/* Shape Controls */}
												<div className="absolute -top-2 -right-2 flex gap-1">
													{/* Delete Button */}
													<button
														onClick={(e) => {
															e.stopPropagation();
															removeShape(shape.id);
														}}
														className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs shadow-lg transition-colors z-10"
														title="Delete shape"
													>
														<X className="w-3 h-3" />
													</button>
												</div>

												{/* Resize Handles */}
												{selectedShape === shape.id && (
													<>
														{/* Corner handles */}
														<div
															className="absolute top-0 left-0 w-3 h-3 bg-orange-500 border border-white rounded-full cursor-nwse-resize"
															onMouseDown={(e) =>
																handleShapeResizeStart(e, shape.id, "nw")
															}
														/>
														<div
															className="absolute top-0 right-0 w-3 h-3 bg-orange-500 border border-white rounded-full cursor-nesw-resize"
															onMouseDown={(e) =>
																handleShapeResizeStart(e, shape.id, "ne")
															}
														/>
														<div
															className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500 border border-white rounded-full cursor-nesw-resize"
															onMouseDown={(e) =>
																handleShapeResizeStart(e, shape.id, "sw")
															}
														/>
														<div
															className="absolute bottom-0 right-0 w-3 h-3 bg-orange-500 border border-white rounded-full cursor-nwse-resize"
															onMouseDown={(e) =>
																handleShapeResizeStart(e, shape.id, "se")
															}
														/>
														{/* Edge handles */}
														<div
															className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-500 border border-white rounded-full cursor-ns-resize"
															onMouseDown={(e) =>
																handleShapeResizeStart(e, shape.id, "n")
															}
														/>
														<div
															className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-500 border border-white rounded-full cursor-ns-resize"
															onMouseDown={(e) =>
																handleShapeResizeStart(e, shape.id, "s")
															}
														/>
														<div
															className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-orange-500 border border-white rounded-full cursor-ew-resize"
															onMouseDown={(e) =>
																handleShapeResizeStart(e, shape.id, "w")
															}
														/>
														<div
															className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-orange-500 border border-white rounded-full cursor-ew-resize"
															onMouseDown={(e) =>
																handleShapeResizeStart(e, shape.id, "e")
															}
														/>
													</>
												)}
											</div>
										);
									})}

									{/* Color Stop Handles - Only show when no element is selected */}
									{selectedImage === null &&
										selectedVideo === null &&
										selectedText === null &&
										selectedShape === null &&
										gradient.stops.map((stop) => (
											<div
												key={stop.id}
												className={`absolute w-6 h-6 flex items-center justify-center cursor-pointer group transition-transform ${
													selectedStop === stop.id
														? "scale-125"
														: "hover:scale-110"
												}`}
												style={{
													left: `calc(${stop.position.x}% - 12px)`,
													top: `calc(${stop.position.y}% - 12px)`,
												}}
												onMouseDown={(e) => handleMouseDown(e, stop.id)}
												onKeyDown={(e) => handleKeyDown(e, stop.id)}
												tabIndex={0}
												role="button"
												aria-label={`Color stop at ${Math.round(
													stop.position.x
												)}%, ${Math.round(stop.position.y)}%`}
											>
												{/* Handle */}
												<div
													className="w-6 h-6 rounded-full border-2 border-white shadow-lg hover:shadow-xl transition-shadow"
													style={{ backgroundColor: stop.color }}
												/>
												{/* Position Indicator */}
												<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black bg-opacity-75 px-2 py-1 rounded whitespace-nowrap">
													{Math.round(stop.position.x)}%,{" "}
													{Math.round(stop.position.y)}%
												</div>
											</div>
										))}
								</div>
							</div>
						</div>
					</div>

					{/* Control Panel */}
					<div className="space-y-6 cols-span-2 ml-auto max-h-[80vh] max-w-sm overflow-y-auto hidescrollbar shadow-xl border border-zinc-100 rounded-xl">
						{/* Gradient Type & Warp */}
						<div className="bg-white rounded-xl shadow-lg p-6">
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Gradient Presets
									</label>
									<div ref={gradientPresetsRef} className="relative">
										<button
											type="button"
											onClick={() =>
												setIsGradientPresetsOpen(!isGradientPresetsOpen)
											}
											className="w-full h-9 px-3 text-sm border border-zinc-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-zinc-400 transition-colors flex items-center justify-between"
										>
											<span className="text-left">Choose Gradient</span>
											<ChevronDown
												className={`w-4 h-4 transition-transform ${
													isGradientPresetsOpen ? "rotate-180" : ""
												}`}
											/>
										</button>

										<AnimatePresence>
											{isGradientPresetsOpen && (
												<motion.div
													initial={{ opacity: 0, y: -10 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: -10 }}
													transition={{ duration: 0.15 }}
													className="absolute z-50 w-full mt-1 bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden"
													style={{ maxHeight: "400px", overflowY: "auto" }}
												>
													<div className="p-3">
														<div className="grid grid-cols-3 gap-2">
															{gradientPresets.map((preset) => (
																<button
																	key={preset.id}
																	type="button"
																	onClick={() => {
																		setGradient((prev) => ({
																			...prev,
																			type: preset.type,
																			angle: preset.angle,
																			stops: preset.stops.map((stop) => ({
																				...stop,
																			})),
																		}));
																		setIsGradientPresetsOpen(false);
																	}}
																	className="aspect-square rounded-xl overflow-hidden border-2 border-zinc-200 hover:border-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400"
																	style={{
																		background:
																			generatePresetGradientCSS(preset),
																	}}
																	title={preset.name}
																>
																	<div className="w-full h-full flex items-end justify-center p-1">
																		<span className="text-xs text-white bg-black bg-opacity-50 px-1.5 py-0.5 rounded text-center truncate w-full">
																			{preset.name}
																		</span>
																	</div>
																</button>
															))}
														</div>
													</div>
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Gradient Type
									</label>
									<Dropdown
										value={gradient.type}
										onChange={(value) =>
											setGradient((prev) => ({ ...prev, type: value }))
										}
										options={[
											{ value: "linear", label: "Linear" },
											{ value: "radial", label: "Radial" },
											{ value: "conic", label: "Conic" },
											{ value: "rectangle", label: "Rectangle" },
											{ value: "ellipse", label: "Ellipse" },
											{ value: "polygon", label: "Polygon" },
											{ value: "mesh", label: "Mesh" },
										]}
										placeholder="Select gradient type"
									/>
								</div>

								{/* Text Styling Panel - Shows when text is selected */}
								{selectedText &&
									(() => {
										const selectedTxt = texts.find(
											(txt) => txt.id === selectedText
										);
										if (!selectedTxt) return null;
										const styles = selectedTxt.styles || {
											fontSize: 24,
											fontWeight: "normal",
											fontStyle: "normal",
											color: "#000000",
											textAlign: "left",
											fontFamily: "Arial",
											backgroundColor: "transparent",
											padding: 0,
											borderRadius: 0,
											borderWidth: 0,
											borderColor: "#000000",
											borderStyle: "solid",
											shadow: "none",
											opacity: 1,
											zIndex: 2,
										};

										return (
											<div className="border-t pt-4 mt-4">
												<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
													<Type className="w-5 h-5" />
													Text Styling
												</h3>

												<div className="space-y-4">
													{/* Font Size */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Font Size: {styles.fontSize || 24}px
														</label>
														<input
															type="range"
															min="8"
															max="120"
															step="1"
															value={styles.fontSize || 24}
															onChange={(e) =>
																updateText(selectedText, {
																	styles: {
																		...styles,
																		fontSize: parseInt(e.target.value),
																	},
																})
															}
															className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
														/>
													</div>

													{/* Font Weight */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Font Weight
														</label>
														<Dropdown
															value={styles.fontWeight || "normal"}
															onChange={(value) =>
																updateText(selectedText, {
																	styles: { ...styles, fontWeight: value },
																})
															}
															options={[
																{ value: "normal", label: "Normal" },
																{ value: "bold", label: "Bold" },
															]}
															placeholder="Select font weight"
														/>
													</div>

													{/* Font Style */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Font Style
														</label>
														<Dropdown
															value={styles.fontStyle || "normal"}
															onChange={(value) =>
																updateText(selectedText, {
																	styles: { ...styles, fontStyle: value },
																})
															}
															options={[
																{ value: "normal", label: "Normal" },
																{ value: "italic", label: "Italic" },
															]}
															placeholder="Select font style"
														/>
													</div>

													{/* Text Color */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Text Color
														</label>
														<div className="flex items-center gap-2">
															<input
																type="color"
																value={styles.color || "#000000"}
																onChange={(e) =>
																	updateText(selectedText, {
																		styles: {
																			...styles,
																			color: e.target.value,
																		},
																	})
																}
																className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
															/>
															<input
																type="text"
																value={styles.color || "#000000"}
																onChange={(e) =>
																	updateText(selectedText, {
																		styles: {
																			...styles,
																			color: e.target.value,
																		},
																	})
																}
																className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
																placeholder="#000000"
															/>
														</div>
													</div>

													{/* Text Align */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Text Align
														</label>
														<Dropdown
															value={styles.textAlign || "left"}
															onChange={(value) =>
																updateText(selectedText, {
																	styles: { ...styles, textAlign: value },
																})
															}
															options={[
																{ value: "left", label: "Left" },
																{ value: "center", label: "Center" },
																{ value: "right", label: "Right" },
															]}
															placeholder="Select text align"
														/>
													</div>

													{/* Font Family */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Font Family
														</label>
														<Dropdown
															value={styles.fontFamily || "Arial"}
															onChange={(value) =>
																updateText(selectedText, {
																	styles: { ...styles, fontFamily: value },
																})
															}
															options={[
																{ value: "Arial", label: "Arial" },
																{ value: "Helvetica", label: "Helvetica" },
																{
																	value: "Times New Roman",
																	label: "Times New Roman",
																},
																{ value: "Courier New", label: "Courier New" },
																{ value: "Verdana", label: "Verdana" },
																{ value: "Georgia", label: "Georgia" },
																{ value: "Palatino", label: "Palatino" },
																{ value: "Garamond", label: "Garamond" },
																{
																	value: "Comic Sans MS",
																	label: "Comic Sans MS",
																},
																{
																	value: "Trebuchet MS",
																	label: "Trebuchet MS",
																},
																{ value: "Impact", label: "Impact" },
															]}
															placeholder="Select font family"
														/>
													</div>

													{/* Background Color */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Background Color
														</label>
														<div className="flex items-center gap-2">
															<input
																type="color"
																value={
																	styles.backgroundColor === "transparent"
																		? "#ffffff"
																		: styles.backgroundColor || "#ffffff"
																}
																onChange={(e) =>
																	updateText(selectedText, {
																		styles: {
																			...styles,
																			backgroundColor: e.target.value,
																		},
																	})
																}
																className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
															/>
															<input
																type="text"
																value={styles.backgroundColor || "transparent"}
																onChange={(e) =>
																	updateText(selectedText, {
																		styles: {
																			...styles,
																			backgroundColor:
																				e.target.value || "transparent",
																		},
																	})
																}
																className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
																placeholder="transparent or color"
															/>
														</div>
													</div>

													{/* Padding */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Padding: {styles.padding || 0}px
														</label>
														<input
															type="range"
															min="0"
															max="50"
															step="1"
															value={styles.padding || 0}
															onChange={(e) =>
																updateText(selectedText, {
																	styles: {
																		...styles,
																		padding: parseInt(e.target.value),
																	},
																})
															}
															className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
														/>
													</div>

													{/* Border Width */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Border Width: {styles.borderWidth || 0}px
														</label>
														<input
															type="range"
															min="0"
															max="20"
															step="1"
															value={styles.borderWidth || 0}
															onChange={(e) =>
																updateText(selectedText, {
																	styles: {
																		...styles,
																		borderWidth: parseInt(e.target.value),
																	},
																})
															}
															className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
														/>
													</div>

													{/* Border Color */}
													{styles.borderWidth > 0 && (
														<div>
															<label className="block text-sm font-medium text-gray-700 mb-2">
																Border Color
															</label>
															<div className="flex items-center gap-2">
																<input
																	type="color"
																	value={styles.borderColor || "#000000"}
																	onChange={(e) =>
																		updateText(selectedText, {
																			styles: {
																				...styles,
																				borderColor: e.target.value,
																			},
																		})
																	}
																	className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
																/>
																<input
																	type="text"
																	value={styles.borderColor || "#000000"}
																	onChange={(e) =>
																		updateText(selectedText, {
																			styles: {
																				...styles,
																				borderColor: e.target.value,
																			},
																		})
																	}
																	className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
																	placeholder="#000000"
																/>
															</div>
														</div>
													)}

													{/* Border Radius */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Border Radius:{" "}
															{styles.borderRadius === 100
																? "100%"
																: `${styles.borderRadius || 0}px`}
														</label>
														<input
															type="range"
															min="0"
															max="100"
															step="1"
															value={styles.borderRadius || 0}
															onChange={(e) =>
																updateText(selectedText, {
																	styles: {
																		...styles,
																		borderRadius: parseInt(e.target.value),
																	},
																})
															}
															className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
														/>
													</div>

													{/* Shadow */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Shadow
														</label>
														<Dropdown
															value={styles.shadow || "none"}
															onChange={(value) =>
																updateText(selectedText, {
																	styles: { ...styles, shadow: value },
																})
															}
															options={[
																{ value: "none", label: "None" },
																{ value: "sm", label: "Small" },
																{ value: "md", label: "Medium" },
																{ value: "lg", label: "Large" },
																{ value: "xl", label: "Extra Large" },
																{ value: "2xl", label: "2X Large" },
															]}
															placeholder="Select shadow"
														/>
													</div>

													{/* Opacity */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Opacity: {Math.round((styles.opacity || 1) * 100)}
															%
														</label>
														<input
															type="range"
															min="0"
															max="1"
															step="0.01"
															value={
																styles.opacity !== undefined
																	? styles.opacity
																	: 1
															}
															onChange={(e) =>
																updateText(selectedText, {
																	styles: {
																		...styles,
																		opacity: parseFloat(e.target.value),
																	},
																})
															}
															className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
														/>
													</div>

													{/* CSS Output */}
													<div className="border-t pt-4">
														<div className="flex items-center justify-between mb-2">
															<h4 className="text-sm font-medium">Text CSS</h4>
															<button
																onClick={() => {
																	const css = `font-size: ${styles.fontSize || 24}px;
font-weight: ${styles.fontWeight || "normal"};
font-style: ${styles.fontStyle || "normal"};
color: ${styles.color || "#000000"};
text-align: ${styles.textAlign || "left"};
font-family: ${styles.fontFamily || "Arial"};
background-color: ${styles.backgroundColor || "transparent"};
padding: ${styles.padding || 0}px;
border-radius: ${styles.borderRadius === 100 ? "50%" : `${styles.borderRadius || 0}px`};
border: ${styles.borderWidth || 0}px ${styles.borderStyle || "solid"} ${styles.borderColor || "#000000"};
opacity: ${styles.opacity !== undefined ? styles.opacity : 1};
${
	styles.shadow !== "none" && styles.shadow
		? `box-shadow: ${
				styles.shadow === "sm"
					? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
					: styles.shadow === "md"
						? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
						: styles.shadow === "lg"
							? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
							: styles.shadow === "xl"
								? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
								: styles.shadow === "2xl"
									? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
									: "none"
			};`
		: ""
}`;
																	copyToClipboard(css, "text-css");
																}}
																className="flex items-center gap-1 px-2 py-1 text-xs bg-zinc-100 hover:bg-zinc-200 rounded transition-colors"
															>
																<Copy className="w-3 h-3" />
																{copied === "text-css" ? "Copied!" : "Copy CSS"}
															</button>
														</div>
														<pre className="bg-gray-900 text-zinc-400 p-3 rounded text-xs overflow-x-auto max-h-32 overflow-y-auto">
															<code>{`font-size: ${styles.fontSize || 24}px;
font-weight: ${styles.fontWeight || "normal"};
font-style: ${styles.fontStyle || "normal"};
color: ${styles.color || "#000000"};
text-align: ${styles.textAlign || "left"};
font-family: ${styles.fontFamily || "Arial"};
background-color: ${styles.backgroundColor || "transparent"};
padding: ${styles.padding || 0}px;
border-radius: ${styles.borderRadius === 100 ? "50%" : `${styles.borderRadius || 0}px`};
border: ${styles.borderWidth || 0}px ${styles.borderStyle || "solid"} ${styles.borderColor || "#000000"};
opacity: ${styles.opacity !== undefined ? styles.opacity : 1};
${
	styles.shadow !== "none" && styles.shadow
		? `box-shadow: ${
				styles.shadow === "sm"
					? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
					: styles.shadow === "md"
						? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
						: styles.shadow === "lg"
							? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
							: styles.shadow === "xl"
								? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
								: styles.shadow === "2xl"
									? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
									: "none"
			};`
		: ""
}`}</code>
														</pre>
													</div>
												</div>
											</div>
										);
									})()}

								{/* Image Styling Panel - Shows when image is selected */}
								{selectedImage &&
									(() => {
										const selectedImg = images.find(
											(img) => img.id === selectedImage
										);
										if (!selectedImg) return null;
										const styles = selectedImg.styles || {
											objectFit: "contain",
											borderWidth: 0,
											borderColor: "#000000",
											borderStyle: "solid",
											ringWidth: 0,
											ringColor: "#3b82f6",
											shadow: "none",
											borderRadius: 0,
											opacity: 1,
											zIndex: 1,
											noise: {
												enabled: false,
												intensity: 0.3,
											},
										};

										return (
											<div className="border-t pt-4 mt-4">
												<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
													<ImageIcon className="w-5 h-5" />
													Image Styling
												</h3>

												<div className="space-y-4">
													{/* Object Fit */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Object Fit: {styles.objectFit || "contain"}
														</label>
														<Dropdown
															value={styles.objectFit || "contain"}
															onChange={(value) =>
																updateImage(selectedImage, {
																	styles: { ...styles, objectFit: value },
																})
															}
															options={[
																{ value: "contain", label: "Contain" },
																{ value: "cover", label: "Cover" },
																{ value: "fill", label: "Fill" },
																{ value: "none", label: "None" },
																{ value: "scale-down", label: "Scale Down" },
															]}
															placeholder="Select object fit"
														/>
													</div>

													{/* Border Width */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Border Width: {styles.borderWidth || 0}px
														</label>
														<input
															type="range"
															min="0"
															max="20"
															step="1"
															value={styles.borderWidth || 0}
															onChange={(e) =>
																updateImage(selectedImage, {
																	styles: {
																		...styles,
																		borderWidth: parseInt(e.target.value),
																	},
																})
															}
															className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
														/>
													</div>

													{/* Border Color */}
													{styles.borderWidth > 0 && (
														<div>
															<label className="block text-sm font-medium text-gray-700 mb-2">
																Border Color
															</label>
															<div className="flex items-center gap-2">
																<input
																	type="color"
																	value={styles.borderColor || "#000000"}
																	onChange={(e) =>
																		updateImage(selectedImage, {
																			styles: {
																				...styles,
																				borderColor: e.target.value,
																			},
																		})
																	}
																	className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
																/>
																<input
																	type="text"
																	value={styles.borderColor || "#000000"}
																	onChange={(e) =>
																		updateImage(selectedImage, {
																			styles: {
																				...styles,
																				borderColor: e.target.value,
																			},
																		})
																	}
																	className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
																	placeholder="#000000"
																/>
															</div>
														</div>
													)}

													{/* Border Style */}
													{styles.borderWidth > 0 && (
														<div>
															<label className="block text-sm font-medium text-gray-700 mb-2">
																Border Style
															</label>
															<Dropdown
																value={styles.borderStyle || "solid"}
																onChange={(value) =>
																	updateImage(selectedImage, {
																		styles: { ...styles, borderStyle: value },
																	})
																}
																options={[
																	{ value: "solid", label: "Solid" },
																	{ value: "dashed", label: "Dashed" },
																	{ value: "dotted", label: "Dotted" },
																]}
																placeholder="Select border style"
															/>
														</div>
													)}

													{/* Border Radius */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Border Radius:{" "}
															{styles.borderRadius === 100
																? "100%"
																: `${styles.borderRadius || 0}px`}
														</label>
														<input
															type="range"
															min="0"
															max="100"
															step="1"
															value={styles.borderRadius || 0}
															onChange={(e) =>
																updateImage(selectedImage, {
																	styles: {
																		...styles,
																		borderRadius: parseInt(e.target.value),
																	},
																})
															}
															className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
														/>
													</div>

													{/* Ring Width */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Ring Width: {styles.ringWidth || 0}px
														</label>
														<input
															type="range"
															min="0"
															max="20"
															step="1"
															value={styles.ringWidth || 0}
															onChange={(e) =>
																updateImage(selectedImage, {
																	styles: {
																		...styles,
																		ringWidth: parseInt(e.target.value),
																	},
																})
															}
															className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
														/>
													</div>

													{/* Ring Color */}
													{styles.ringWidth > 0 && (
														<div>
															<label className="block text-sm font-medium text-gray-700 mb-2">
																Ring Color
															</label>
															<div className="flex items-center gap-2">
																<input
																	type="color"
																	value={styles.ringColor || "#3b82f6"}
																	onChange={(e) =>
																		updateImage(selectedImage, {
																			styles: {
																				...styles,
																				ringColor: e.target.value,
																			},
																		})
																	}
																	className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
																/>
																<input
																	type="text"
																	value={styles.ringColor || "#3b82f6"}
																	onChange={(e) =>
																		updateImage(selectedImage, {
																			styles: {
																				...styles,
																				ringColor: e.target.value,
																			},
																		})
																	}
																	className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
																	placeholder="#3b82f6"
																/>
															</div>
														</div>
													)}

													{/* Shadow */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Shadow
														</label>
														<Dropdown
															value={styles.shadow || "none"}
															onChange={(value) =>
																updateImage(selectedImage, {
																	styles: { ...styles, shadow: value },
																})
															}
															options={[
																{ value: "none", label: "None" },
																{ value: "sm", label: "Small" },
																{ value: "md", label: "Medium" },
																{ value: "lg", label: "Large" },
																{ value: "xl", label: "Extra Large" },
																{ value: "2xl", label: "2X Large" },
															]}
															placeholder="Select shadow"
														/>
													</div>

													{/* Opacity */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Opacity: {Math.round((styles.opacity || 1) * 100)}
															%
														</label>
														<input
															type="range"
															min="0"
															max="1"
															step="0.01"
															value={
																styles.opacity !== undefined
																	? styles.opacity
																	: 1
															}
															onChange={(e) =>
																updateImage(selectedImage, {
																	styles: {
																		...styles,
																		opacity: parseFloat(e.target.value),
																	},
																})
															}
															className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
														/>
													</div>

													{/* Z-Index */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Z-Index: {styles.zIndex || 1}
														</label>
														<input
															type="range"
															min="1"
															max="10"
															step="1"
															value={styles.zIndex || 1}
															onChange={(e) =>
																updateImage(selectedImage, {
																	styles: {
																		...styles,
																		zIndex: parseInt(e.target.value),
																	},
																})
															}
															className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
														/>
													</div>

													{/* Noise */}
													<div className="border-t pt-4">
														<div className="flex items-center justify-between mb-2">
															<label className="block text-sm font-medium text-gray-700">
																Noise
															</label>
															<input
																type="checkbox"
																checked={styles.noise?.enabled || false}
																onChange={(e) =>
																	updateImage(selectedImage, {
																		styles: {
																			...styles,
																			noise: {
																				...styles.noise,
																				enabled: e.target.checked,
																				intensity:
																					styles.noise?.intensity || 0.3,
																			},
																		},
																	})
																}
																className="w-4 h-4 text-zinc-600 bg-gray-100 border-gray-300 rounded focus:ring-zinc-500 focus:ring-2"
															/>
														</div>
														{styles.noise?.enabled && (
															<div>
																<label className="block text-sm font-medium text-gray-700 mb-2">
																	Noise Intensity:{" "}
																	{Math.round(
																		(styles.noise?.intensity || 0.3) * 100
																	)}
																	%
																</label>
																<input
																	type="range"
																	min="0"
																	max="1"
																	step="0.01"
																	value={styles.noise?.intensity || 0.3}
																	onChange={(e) =>
																		updateImage(selectedImage, {
																			styles: {
																				...styles,
																				noise: {
																					...styles.noise,
																					enabled: true,
																					intensity: parseFloat(e.target.value),
																				},
																			},
																		})
																	}
																	className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
																/>
															</div>
														)}
													</div>

													{/* CSS Output */}
													<div className="border-t pt-4">
														<div className="flex items-center justify-between mb-2">
															<h4 className="text-sm font-medium">Image CSS</h4>
															<button
																onClick={() => {
																	const css = `object-fit: ${styles.objectFit || "contain"};
border: ${styles.borderWidth || 0}px ${styles.borderStyle || "solid"} ${styles.borderColor || "#000000"};
border-radius: ${styles.borderRadius === 100 ? "50%" : `${styles.borderRadius || 0}px`};
opacity: ${styles.opacity !== undefined ? styles.opacity : 1};
z-index: ${styles.zIndex || 1};
${
	styles.shadow !== "none" && styles.shadow
		? `box-shadow: ${
				styles.shadow === "sm"
					? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
					: styles.shadow === "md"
						? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
						: styles.shadow === "lg"
							? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
							: styles.shadow === "xl"
								? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
								: styles.shadow === "2xl"
									? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
									: "none"
			};`
		: ""
}${
																		styles.ringWidth > 0
																			? `\noutline: ${styles.ringWidth}px solid ${styles.ringColor || "#3b82f6"};
outline-offset: 2px;`
																			: ""
																	}`;
																	copyToClipboard(css, "image-css");
																}}
																className="flex items-center gap-1 px-2 py-1 text-xs bg-zinc-100 hover:bg-zinc-200 rounded transition-colors"
															>
																<Copy className="w-3 h-3" />
																{copied === "image-css"
																	? "Copied!"
																	: "Copy CSS"}
															</button>
														</div>
														<pre className="bg-gray-900 text-zinc-400 p-3 rounded text-xs overflow-x-auto max-h-32 overflow-y-auto">
															<code>{`object-fit: ${styles.objectFit || "contain"};
border: ${styles.borderWidth || 0}px ${styles.borderStyle || "solid"} ${styles.borderColor || "#000000"};
border-radius: ${styles.borderRadius === 100 ? "50%" : `${styles.borderRadius || 0}px`};
opacity: ${styles.opacity !== undefined ? styles.opacity : 1};
z-index: ${styles.zIndex || 1};
${
	styles.shadow !== "none" && styles.shadow
		? `box-shadow: ${
				styles.shadow === "sm"
					? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
					: styles.shadow === "md"
						? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
						: styles.shadow === "lg"
							? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
							: styles.shadow === "xl"
								? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
								: styles.shadow === "2xl"
									? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
									: "none"
			};`
		: ""
}${
																styles.ringWidth > 0
																	? `\noutline: ${styles.ringWidth}px solid ${styles.ringColor || "#3b82f6"};
outline-offset: 2px;`
																	: ""
															}`}</code>
														</pre>
													</div>
												</div>
											</div>
										);
									})()}

								{/* Video Styling Panel - Shows when video is selected */}
								{selectedVideo &&
									(() => {
										const selectedVid = videos.find(
											(vid) => vid.id === selectedVideo
										);
										if (!selectedVid) return null;
										const styles = selectedVid.styles || {
											objectFit: "contain",
											borderWidth: 0,
											borderColor: "#000000",
											borderStyle: "solid",
											ringWidth: 0,
											ringColor: "#3b82f6",
											shadow: "none",
											borderRadius: 0,
											opacity: 1,
											zIndex: 1,
										};

										return (
											<div className="border-t pt-4 mt-4">
												<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
													<Video className="w-5 h-5" />
													Video Styling
												</h3>

												<div className="space-y-4">
													{/* Object Fit */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Object Fit: {styles.objectFit || "contain"}
														</label>
														<Dropdown
															value={styles.objectFit || "contain"}
															onChange={(value) =>
																updateVideo(selectedVideo, {
																	styles: { ...styles, objectFit: value },
																})
															}
															options={[
																{ value: "contain", label: "Contain" },
																{ value: "cover", label: "Cover" },
																{ value: "fill", label: "Fill" },
																{ value: "none", label: "None" },
																{ value: "scale-down", label: "Scale Down" },
															]}
															placeholder="Select object fit"
														/>
													</div>

													{/* Border Width */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Border Width: {styles.borderWidth || 0}px
														</label>
														<input
															type="range"
															min="0"
															max="20"
															step="1"
															value={styles.borderWidth || 0}
															onChange={(e) =>
																updateVideo(selectedVideo, {
																	styles: {
																		...styles,
																		borderWidth: parseInt(e.target.value),
																	},
																})
															}
															className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
														/>
													</div>

													{/* Border Color */}
													{styles.borderWidth > 0 && (
														<div>
															<label className="block text-sm font-medium text-gray-700 mb-2">
																Border Color
															</label>
															<div className="flex items-center gap-2">
																<input
																	type="color"
																	value={styles.borderColor || "#000000"}
																	onChange={(e) =>
																		updateVideo(selectedVideo, {
																			styles: {
																				...styles,
																				borderColor: e.target.value,
																			},
																		})
																	}
																	className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
																/>
																<input
																	type="text"
																	value={styles.borderColor || "#000000"}
																	onChange={(e) =>
																		updateVideo(selectedVideo, {
																			styles: {
																				...styles,
																				borderColor: e.target.value,
																			},
																		})
																	}
																	className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
																	placeholder="#000000"
																/>
															</div>
														</div>
													)}

													{/* Border Style */}
													{styles.borderWidth > 0 && (
														<div>
															<label className="block text-sm font-medium text-gray-700 mb-2">
																Border Style
															</label>
															<Dropdown
																value={styles.borderStyle || "solid"}
																onChange={(value) =>
																	updateVideo(selectedVideo, {
																		styles: { ...styles, borderStyle: value },
																	})
																}
																options={[
																	{ value: "solid", label: "Solid" },
																	{ value: "dashed", label: "Dashed" },
																	{ value: "dotted", label: "Dotted" },
																]}
																placeholder="Select border style"
															/>
														</div>
													)}

													{/* Border Radius */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Border Radius:{" "}
															{styles.borderRadius === 100
																? "100%"
																: `${styles.borderRadius || 0}px`}
														</label>
														<input
															type="range"
															min="0"
															max="100"
															step="1"
															value={styles.borderRadius || 0}
															onChange={(e) =>
																updateVideo(selectedVideo, {
																	styles: {
																		...styles,
																		borderRadius: parseInt(e.target.value),
																	},
																})
															}
															className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
														/>
													</div>

													{/* Ring Width */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Ring Width: {styles.ringWidth || 0}px
														</label>
														<input
															type="range"
															min="0"
															max="20"
															step="1"
															value={styles.ringWidth || 0}
															onChange={(e) =>
																updateVideo(selectedVideo, {
																	styles: {
																		...styles,
																		ringWidth: parseInt(e.target.value),
																	},
																})
															}
															className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
														/>
													</div>

													{/* Ring Color */}
													{styles.ringWidth > 0 && (
														<div>
															<label className="block text-sm font-medium text-gray-700 mb-2">
																Ring Color
															</label>
															<div className="flex items-center gap-2">
																<input
																	type="color"
																	value={styles.ringColor || "#3b82f6"}
																	onChange={(e) =>
																		updateVideo(selectedVideo, {
																			styles: {
																				...styles,
																				ringColor: e.target.value,
																			},
																		})
																	}
																	className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
																/>
																<input
																	type="text"
																	value={styles.ringColor || "#3b82f6"}
																	onChange={(e) =>
																		updateVideo(selectedVideo, {
																			styles: {
																				...styles,
																				ringColor: e.target.value,
																			},
																		})
																	}
																	className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
																	placeholder="#3b82f6"
																/>
															</div>
														</div>
													)}

													{/* Shadow */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Shadow
														</label>
														<Dropdown
															value={styles.shadow || "none"}
															onChange={(value) =>
																updateVideo(selectedVideo, {
																	styles: { ...styles, shadow: value },
																})
															}
															options={[
																{ value: "none", label: "None" },
																{ value: "sm", label: "Small" },
																{ value: "md", label: "Medium" },
																{ value: "lg", label: "Large" },
																{ value: "xl", label: "Extra Large" },
																{ value: "2xl", label: "2X Large" },
															]}
															placeholder="Select shadow"
														/>
													</div>

													{/* Opacity */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Opacity: {Math.round((styles.opacity || 1) * 100)}
															%
														</label>
														<input
															type="range"
															min="0"
															max="1"
															step="0.01"
															value={
																styles.opacity !== undefined
																	? styles.opacity
																	: 1
															}
															onChange={(e) =>
																updateVideo(selectedVideo, {
																	styles: {
																		...styles,
																		opacity: parseFloat(e.target.value),
																	},
																})
															}
															className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
														/>
													</div>

													{/* Z-Index */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Z-Index: {styles.zIndex || 1}
														</label>
														<input
															type="range"
															min="1"
															max="10"
															step="1"
															value={styles.zIndex || 1}
															onChange={(e) =>
																updateVideo(selectedVideo, {
																	styles: {
																		...styles,
																		zIndex: parseInt(e.target.value),
																	},
																})
															}
															className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
														/>
													</div>

													{/* CSS Output */}
													<div className="border-t pt-4">
														<div className="flex items-center justify-between mb-2">
															<h4 className="text-sm font-medium">Video CSS</h4>
															<button
																onClick={() => {
																	const css = `object-fit: ${styles.objectFit || "contain"};
border: ${styles.borderWidth || 0}px ${styles.borderStyle || "solid"} ${styles.borderColor || "#000000"};
border-radius: ${styles.borderRadius === 100 ? "50%" : `${styles.borderRadius || 0}px`};
opacity: ${styles.opacity !== undefined ? styles.opacity : 1};
z-index: ${styles.zIndex || 1};
${
	styles.shadow !== "none" && styles.shadow
		? `box-shadow: ${
				styles.shadow === "sm"
					? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
					: styles.shadow === "md"
						? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
						: styles.shadow === "lg"
							? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
							: styles.shadow === "xl"
								? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
								: styles.shadow === "2xl"
									? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
									: "none"
			};`
		: ""
}${
																		styles.ringWidth > 0
																			? `\noutline: ${styles.ringWidth}px solid ${styles.ringColor || "#3b82f6"};
outline-offset: 2px;`
																			: ""
																	}`;
																	copyToClipboard(css, "video-css");
																}}
																className="flex items-center gap-1 px-2 py-1 text-xs bg-zinc-100 hover:bg-zinc-200 rounded transition-colors"
															>
																<Copy className="w-3 h-3" />
																{copied === "video-css"
																	? "Copied!"
																	: "Copy CSS"}
															</button>
														</div>
														<pre className="bg-gray-900 text-zinc-400 p-3 rounded text-xs overflow-x-auto max-h-32 overflow-y-auto">
															<code>{`object-fit: ${styles.objectFit || "contain"};
border: ${styles.borderWidth || 0}px ${styles.borderStyle || "solid"} ${styles.borderColor || "#000000"};
border-radius: ${styles.borderRadius === 100 ? "50%" : `${styles.borderRadius || 0}px`};
opacity: ${styles.opacity !== undefined ? styles.opacity : 1};
z-index: ${styles.zIndex || 1};
${
	styles.shadow !== "none" && styles.shadow
		? `box-shadow: ${
				styles.shadow === "sm"
					? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
					: styles.shadow === "md"
						? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
						: styles.shadow === "lg"
							? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
							: styles.shadow === "xl"
								? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
								: styles.shadow === "2xl"
									? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
									: "none"
			};`
		: ""
}${
																styles.ringWidth > 0
																	? `\noutline: ${styles.ringWidth}px solid ${styles.ringColor || "#3b82f6"};
outline-offset: 2px;`
																	: ""
															}`}</code>
														</pre>
													</div>
												</div>
											</div>
										);
									})()}

								{/* Shape Styling Panel - Shows when shape is selected */}
								{selectedShape &&
									(() => {
										const selectedShp = shapes.find(
											(shp) => shp.id === selectedShape
										);
										if (!selectedShp) return null;
										const styles = selectedShp.styles || {
											fillColor: "#3b82f6",
											strokeColor: "#1e40af",
											strokeWidth: 2,
											opacity: 1,
											borderRadius: 0,
											shadow: "none",
											zIndex: 1,
										};

										return (
											<div className="border-t pt-4 mt-4">
												<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
													<Square className="w-5 h-5" />
													Shape Styling
												</h3>

												<div className="space-y-4">
													{/* Fill Color */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Fill Color
														</label>
														<div className="flex items-center gap-2">
															<input
																type="color"
																value={styles.fillColor || "#3b82f6"}
																onChange={(e) =>
																	updateShape(selectedShape, {
																		styles: {
																			...styles,
																			fillColor: e.target.value,
																		},
																	})
																}
																className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
															/>
															<input
																type="text"
																value={styles.fillColor || "#3b82f6"}
																onChange={(e) =>
																	updateShape(selectedShape, {
																		styles: {
																			...styles,
																			fillColor: e.target.value,
																		},
																	})
																}
																className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
																placeholder="#3b82f6"
															/>
														</div>
													</div>

													{/* Stroke Color */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Stroke Color
														</label>
														<div className="flex items-center gap-2">
															<input
																type="color"
																value={styles.strokeColor || "#1e40af"}
																onChange={(e) =>
																	updateShape(selectedShape, {
																		styles: {
																			...styles,
																			strokeColor: e.target.value,
																		},
																	})
																}
																className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
															/>
															<input
																type="text"
																value={styles.strokeColor || "#1e40af"}
																onChange={(e) =>
																	updateShape(selectedShape, {
																		styles: {
																			...styles,
																			strokeColor: e.target.value,
																		},
																	})
																}
																className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
																placeholder="#1e40af"
															/>
														</div>
													</div>

													{/* Stroke Width */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Stroke Width: {styles.strokeWidth || 2}px
														</label>
														<input
															type="range"
															min="0"
															max="20"
															step="1"
															value={styles.strokeWidth || 2}
															onChange={(e) =>
																updateShape(selectedShape, {
																	styles: {
																		...styles,
																		strokeWidth: parseInt(e.target.value),
																	},
																})
															}
															className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
														/>
													</div>

													{/* Border Radius (for rectangle/square) */}
													{(selectedShp.type === "rectangle" ||
														selectedShp.type === "square") && (
														<div>
															<label className="block text-sm font-medium text-gray-700 mb-2">
																Border Radius: {styles.borderRadius || 0}px
															</label>
															<input
																type="range"
																min="0"
																max="100"
																step="1"
																value={styles.borderRadius || 0}
																onChange={(e) =>
																	updateShape(selectedShape, {
																		styles: {
																			...styles,
																			borderRadius: parseInt(e.target.value),
																		},
																	})
																}
																className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
															/>
														</div>
													)}

													{/* Shadow */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Shadow
														</label>
														<Dropdown
															value={styles.shadow || "none"}
															onChange={(value) =>
																updateShape(selectedShape, {
																	styles: { ...styles, shadow: value },
																})
															}
															options={[
																{ value: "none", label: "None" },
																{ value: "sm", label: "Small" },
																{ value: "md", label: "Medium" },
																{ value: "lg", label: "Large" },
																{ value: "xl", label: "Extra Large" },
																{ value: "2xl", label: "2X Large" },
															]}
															placeholder="Select shadow"
														/>
													</div>

													{/* Opacity */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Opacity: {Math.round((styles.opacity || 1) * 100)}
															%
														</label>
														<input
															type="range"
															min="0"
															max="1"
															step="0.01"
															value={
																styles.opacity !== undefined
																	? styles.opacity
																	: 1
															}
															onChange={(e) =>
																updateShape(selectedShape, {
																	styles: {
																		...styles,
																		opacity: parseFloat(e.target.value),
																	},
																})
															}
															className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
														/>
													</div>

													{/* Z-Index */}
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Z-Index: {styles.zIndex || 1}
														</label>
														<input
															type="range"
															min="1"
															max="10"
															step="1"
															value={styles.zIndex || 1}
															onChange={(e) =>
																updateShape(selectedShape, {
																	styles: {
																		...styles,
																		zIndex: parseInt(e.target.value),
																	},
																})
															}
															className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
														/>
													</div>
												</div>
											</div>
										);
									})()}

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Animation Type
									</label>
									<Dropdown
										value={gradient.animation.type}
										onChange={(value) =>
											setGradient((prev) => ({
												...prev,
												animation: { ...prev.animation, type: value },
											}))
										}
										options={[
											{ value: "rotate", label: "Rotate" },
											{ value: "pulse", label: "Pulse" },
											{ value: "shift", label: "Color Shift" },
										]}
										placeholder="Select animation type"
									/>
								</div>

								{/* Background Animation Controls */}
								<div className="border-t pt-4">
									<h3 className="text-lg font-semibold mb-4">
										Background Animation
									</h3>

									<div className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Animation Type
											</label>
											<Dropdown
												value={gradient.backgroundAnimation.type}
												onChange={(value) =>
													setGradient((prev) => ({
														...prev,
														backgroundAnimation: {
															...prev.backgroundAnimation,
															type: value,
														},
													}))
												}
												options={[
													{ value: "slide", label: "Slide" },
													{ value: "wave", label: "Wave" },
												]}
												placeholder="Select animation type"
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Direction
											</label>
											<Dropdown
												value={gradient.backgroundAnimation.direction}
												onChange={(value) =>
													setGradient((prev) => ({
														...prev,
														backgroundAnimation: {
															...prev.backgroundAnimation,
															direction: value,
														},
													}))
												}
												options={[
													{ value: "right", label: "Right" },
													{ value: "left", label: "Left" },
													{ value: "up", label: "Up" },
													{ value: "down", label: "Down" },
												]}
												placeholder="Select direction"
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Speed: {gradient.backgroundAnimation.speed}s
											</label>
											<input
												type="range"
												min="1"
												max="20"
												step="1"
												value={gradient.backgroundAnimation.speed}
												onChange={(e) =>
													setGradient((prev) => ({
														...prev,
														backgroundAnimation: {
															...prev.backgroundAnimation,
															speed: parseInt(e.target.value),
														},
													}))
												}
												className="w-full h-2 bg-zinc-200 rounded-xl appearance-none cursor-pointer slider"
												style={{
													background: `linear-gradient(to right, #71717a 0%, #71717a ${
														((gradient.backgroundAnimation.speed - 1) / 19) *
														100
													}%, #e4e4e7 ${
														((gradient.backgroundAnimation.speed - 1) / 19) *
														100
													}%, #e4e4e7 100%)`,
												}}
											/>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Easing
											</label>
											<Dropdown
												value={gradient.backgroundAnimation.easing}
												onChange={(value) =>
													setGradient((prev) => ({
														...prev,
														backgroundAnimation: {
															...prev.backgroundAnimation,
															easing: value,
														},
													}))
												}
												options={[
													{ value: "linear", label: "Linear" },
													{ value: "ease", label: "Ease" },
													{ value: "ease-in", label: "Ease In" },
													{ value: "ease-out", label: "Ease Out" },
													{ value: "ease-in-out", label: "Ease In Out" },
												]}
												placeholder="Select easing"
											/>
										</div>

										<div>
											<label className="flex items-center space-x-2 text-sm font-medium">
												<input
													type="checkbox"
													checked={gradient.backgroundAnimation.repeat || false}
													onChange={(e) =>
														setGradient((prev) => ({
															...prev,
															backgroundAnimation: {
																...prev.backgroundAnimation,
																repeat: e.target.checked,
															},
														}))
													}
													className="w-4 h-4 text-zinc-600 bg-gray-100 border-gray-300 rounded focus:ring-zinc-500 focus:ring-2"
												/>
												<span>Repeat Animation (infinite)</span>
											</label>
										</div>

										{/* Background CSS Output */}
										<div className="border-t pt-4">
											<div className="flex items-center justify-between mb-2">
												<h4 className="text-sm font-medium">Background CSS</h4>
												<button
													onClick={() => {
														const css = `background: ${generateGradientCSS()};${
															backgroundAnimation
																? `\n${backgroundAnimation}`
																: ""
														}`;
														copyToClipboard(css, "background-css");
													}}
													className="flex items-center gap-1 px-2 py-1 text-xs bg-zinc-100 hover:bg-zinc-200 rounded transition-colors"
												>
													<Copy className="w-3 h-3" />
													{copied === "background-css" ? "Copied!" : "Copy CSS"}
												</button>
											</div>
											<pre className="bg-gray-900 text-zinc-400 p-3 rounded text-xs overflow-x-auto max-h-32 overflow-y-auto">
												<code>{`background: ${generateGradientCSS()};${
													backgroundAnimation ? `\n${backgroundAnimation}` : ""
												}`}</code>
											</pre>
										</div>
									</div>
								</div>

								{/* Color Stops */}
								<div>
									<div className="flex items-center justify-between mb-4">
										<h3 className="text-lg font-semibold">Color Stops</h3>
										<button
											onClick={addColorStop}
											className="flex items-center gap-2 px-3 py-1.5 bg-zinc-600 text-white rounded-xl hover:bg-zinc-700 transition-colors text-sm h-9"
										>
											<Plus className="w-3 h-3" />
											Add Stop
										</button>
									</div>

									<div className="space-y-3">
										{gradient.stops.map((stop) => (
											<div
												key={stop.id}
												className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
											>
												<input
													type="color"
													value={stop.color}
													onChange={(e) =>
														updateColorStop(stop.id, "color", e.target.value)
													}
													className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
													aria-label={`Color for stop at ${Math.round(
														stop.position.x
													)}%, ${Math.round(stop.position.y)}%`}
												/>
												<div className="flex-1">
													<div className="text-sm text-gray-600 mb-1">
														Position: {Math.round(stop.position.x)}%,{" "}
														{Math.round(stop.position.y)}%
													</div>
													<div className="text-xs text-gray-500 font-mono">
														{stop.color}
													</div>
												</div>
												{gradient.stops.length > 2 && (
													<button
														onClick={() => removeColorStop(stop.id)}
														className="p-2 text-red-500 hover:bg-red-50 rounded"
														aria-label={`Remove color stop`}
													>
														<Trash2 className="w-4 h-4" />
													</button>
												)}
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Modal */}
			<AnimatePresence>
				{isModalOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
						onClick={() => setIsModalOpen(false)}
					>
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							className="relative flex items-center justify-center w-full h-full"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Close Button, Download, and Frame Size Selector */}
							<div className="absolute top-4 right-4 flex items-center gap-2 z-50">
								{/* Frame Size Selector */}
								<div className="flex items-center">
									<Dropdown
										value={previewFrameSize}
										onChange={(value) => {
											setPreviewFrameSize(value);
											const frame = previewFramePresets[value];
											if (frame) {
												setGradient((prev) => ({
													...prev,
													dimensions: {
														width: frame.width,
														height: frame.height,
													},
												}));
											}
										}}
										options={Object.entries(previewFramePresets).map(
											([key, preset]) => ({
												value: key,
												label: `${preset.icon} ${preset.label} (${preset.width}×${preset.height})`,
											})
										)}
										placeholder="Select frame size"
										className="min-w-[180px]"
									/>
								</div>
								{/* Download Button with Dropdown */}
								<div ref={downloadDropdownRef} className="relative">
									<button
										onClick={() =>
											setIsDownloadDropdownOpen(!isDownloadDropdownOpen)
										}
										className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white hover:bg-gray-100 rounded-xl transition-colors border border-gray-200 shadow-lg h-10"
									>
										<Download className="w-4 h-4" />
										Download
									</button>
									<AnimatePresence>
										{isDownloadDropdownOpen && (
											<motion.div
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												transition={{ duration: 0.15 }}
												className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 min-w-[200px]"
											>
												<div className="flex flex-col">
													<button
														type="button"
														onClick={() => {
															downloadSVG(previewFrameSize);
															setIsDownloadDropdownOpen(false);
														}}
														className="w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
													>
														<Download className="w-4 h-4" />
														<span>
															Download as SVG -{" "}
															{previewFramePresets[previewFrameSize]?.label ||
																"Current Frame"}
														</span>
													</button>
													<button
														type="button"
														onClick={() => {
															downloadRaster("png", previewFrameSize);
															setIsDownloadDropdownOpen(false);
														}}
														className="w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2 border-t border-gray-100"
													>
														<Download className="w-4 h-4" />
														<span>
															Download as PNG -{" "}
															{previewFramePresets[previewFrameSize]?.label ||
																"Current Frame"}
														</span>
													</button>
													<button
														type="button"
														onClick={() => {
															downloadRaster("jpeg", previewFrameSize);
															setIsDownloadDropdownOpen(false);
														}}
														className="w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2 border-t border-gray-100"
													>
														<Download className="w-4 h-4" />
														<span>
															Download as JPEG -{" "}
															{previewFramePresets[previewFrameSize]?.label ||
																"Current Frame"}
														</span>
													</button>
													{/* GIF Download - Only show if background animation is enabled */}
													{gradient.backgroundAnimation.enabled && (
														<button
															type="button"
															onClick={() => {
																downloadGIF(previewFrameSize);
																setIsDownloadDropdownOpen(false);
															}}
															className="w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2 border-t border-gray-100"
														>
															<Download className="w-4 h-4" />
															<span>
																Download as GIF -{" "}
																{previewFramePresets[previewFrameSize]?.label ||
																	"Current Frame"}
															</span>
														</button>
													)}
													{/* MP4 Download */}
													<button
														type="button"
														onClick={() => {
															downloadMP4(previewFrameSize);
															setIsDownloadDropdownOpen(false);
														}}
														className="w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors flex items-center gap-2 border-t border-gray-100"
													>
														<Video className="w-4 h-4" />
														<span>
															Download as MP4 -{" "}
															{previewFramePresets[previewFrameSize]?.label ||
																"Current Frame"}
														</span>
													</button>
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
								{/* Close Button */}
								<button
									onClick={() => setIsModalOpen(false)}
									className="w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-lg transition-colors border border-gray-200"
								>
									<X className="w-5 h-5 text-gray-900" />
								</button>
							</div>

							{/* Modal Preview Container */}
							<div
								ref={modalPreviewRef}
								className="relative rounded-xl overflow-hidden shadow-2xl"
								style={{
									aspectRatio: `${gradient.dimensions.width} / ${gradient.dimensions.height}`,
									...modalDimensions,
									background: generateGradientCSS(),
									...(isPlaying &&
										gradient.backgroundAnimation.enabled && {
											backgroundSize: "200% 200%",
										}),
									...(isPlaying &&
										backgroundAnimation && {
											animation: backgroundAnimation,
										}),
								}}
							>
								{/* Element Animation Overlay */}
								<div
									className="absolute inset-0 pointer-events-none"
									style={{
										...(isPlaying && animation && { animation }),
									}}
								/>

								{/* Text Elements - Modal */}
								{texts.map((text) => {
									// Calculate scaling based on actual rendered dimensions
									const modalActualHeight =
										modalPreviewRef.current?.offsetHeight ||
										gradient.dimensions.height;
									const modalActualWidth =
										modalPreviewRef.current?.offsetWidth ||
										gradient.dimensions.width;
									const previewActualHeight =
										previewRef.current?.offsetHeight ||
										gradient.dimensions.height;
									const previewActualWidth =
										previewRef.current?.offsetWidth ||
										gradient.dimensions.width;

									// Calculate scale factors
									const scaleX =
										previewActualWidth > 0
											? modalActualWidth / previewActualWidth
											: 1;
									const scaleY =
										previewActualHeight > 0
											? modalActualHeight / previewActualHeight
											: 1;

									const styles = text.styles || {};
									return (
										<div
											key={text.id}
											className="absolute"
											style={{
												left: `${text.x}%`,
												top: `${text.y}%`,
												width: `${text.width * scaleX}px`,
												minHeight: `${text.height * scaleY}px`,
												transform: "translate(-50%, -50%)",
												fontSize: `${(styles.fontSize || 24) * scaleY}px`,
												fontWeight: styles.fontWeight || "normal",
												fontStyle: styles.fontStyle || "normal",
												color: styles.color || "#000000",
												textAlign: styles.textAlign || "left",
												fontFamily: styles.fontFamily || "Arial",
												backgroundColor:
													styles.backgroundColor || "transparent",
												padding: `${(styles.padding || 0) * scaleY}px`,
												borderRadius:
													styles.borderRadius === 100
														? "50%"
														: `${(styles.borderRadius || 0) * scaleY}px`,
												borderWidth: `${(styles.borderWidth || 0) * scaleY}px`,
												borderColor: styles.borderColor || "#000000",
												borderStyle: styles.borderStyle || "solid",
												opacity:
													styles.opacity !== undefined ? styles.opacity : 1,
												boxShadow:
													styles.shadow !== "none" && styles.shadow
														? styles.shadow === "sm"
															? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
															: styles.shadow === "md"
																? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
																: styles.shadow === "lg"
																	? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
																	: styles.shadow === "xl"
																		? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
																		: styles.shadow === "2xl"
																			? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
																			: "none"
														: "none",
												zIndex: styles.zIndex || 2,
												whiteSpace: "pre-wrap",
												wordWrap: "break-word",
											}}
										>
											{text.content}
										</div>
									);
								})}

								{/* Image Elements - Modal */}
								{images.map((image) => {
									// Calculate scaling based on actual rendered dimensions
									const modalActualHeight =
										modalPreviewRef.current?.offsetHeight ||
										gradient.dimensions.height;
									const modalActualWidth =
										modalPreviewRef.current?.offsetWidth ||
										gradient.dimensions.width;
									const previewActualHeight =
										previewRef.current?.offsetHeight ||
										gradient.dimensions.height;
									const previewActualWidth =
										previewRef.current?.offsetWidth ||
										gradient.dimensions.width;

									// Calculate scale factors
									const scaleX =
										previewActualWidth > 0
											? modalActualWidth / previewActualWidth
											: 1;
									const scaleY =
										previewActualHeight > 0
											? modalActualHeight / previewActualHeight
											: 1;

									return (
										<div
											key={image.id}
											className="absolute"
											style={{
												left: `${image.x}%`,
												top: `${image.y}%`,
												width: `${image.width * scaleX}px`,
												height: `${image.height * scaleY}px`,
												transform: "translate(-50%, -50%)",
												zIndex: image.styles?.zIndex || 1,
											}}
										>
											{/* Image Wrapper with all styles */}
											<div
												className="w-full h-full"
												style={{
													borderRadius:
														image.styles?.borderRadius === 100
															? "50%"
															: `${(image.styles?.borderRadius || 0) * scaleY}px`,
													overflow: "hidden",
													borderWidth: `${(image.styles?.borderWidth || 0) * scaleY}px`,
													borderColor: image.styles?.borderColor || "#000000",
													borderStyle: image.styles?.borderStyle || "solid",
													opacity:
														image.styles?.opacity !== undefined
															? image.styles.opacity
															: 1,
													boxShadow:
														image.styles?.shadow === "none" ||
														!image.styles?.shadow
															? "none"
															: image.styles.shadow === "sm"
																? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
																: image.styles.shadow === "md"
																	? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
																	: image.styles.shadow === "lg"
																		? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
																		: image.styles.shadow === "xl"
																			? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
																			: image.styles.shadow === "2xl"
																				? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
																				: "none",
													...(image.styles?.ringWidth > 0 && {
														outline: `${image.styles.ringWidth * scaleY}px solid ${image.styles.ringColor}`,
														outlineOffset: `${2 * scaleY}px`,
													}),
												}}
											>
												<img
													src={image.src}
													alt="Uploaded"
													className="w-full h-full"
													style={{
														objectFit: image.styles?.objectFit || "contain",
														...(image.styles?.noise?.enabled && {
															filter: `contrast(${
																1 + (image.styles.noise.intensity || 0.3) * 0.2
															}) brightness(${
																1 + (image.styles.noise.intensity || 0.3) * 0.1
															})`,
														}),
													}}
													draggable={false}
												/>
											</div>
											{/* Noise texture overlay for image only */}
											{image.styles?.noise?.enabled && (
												<div
													className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
													style={{
														backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter-modal-${image.id}'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter-modal-${image.id})'/%3E%3C/svg%3E")`,
														opacity: image.styles.noise.intensity || 0.3,
														borderRadius:
															image.styles?.borderRadius === 100
																? "50%"
																: `${(image.styles?.borderRadius || 0) * scaleY}px`,
													}}
												/>
											)}
											{image.caption && (
												<div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-white bg-black bg-opacity-75 px-2 py-1 rounded whitespace-nowrap z-10">
													{image.caption}
												</div>
											)}
										</div>
									);
								})}

								{/* Video Elements - Modal */}
								{videos.map((video) => {
									// Calculate scaling based on actual rendered dimensions
									const modalActualHeight =
										modalPreviewRef.current?.offsetHeight ||
										gradient.dimensions.height;
									const modalActualWidth =
										modalPreviewRef.current?.offsetWidth ||
										gradient.dimensions.width;
									const previewActualHeight =
										previewRef.current?.offsetHeight ||
										gradient.dimensions.height;
									const previewActualWidth =
										previewRef.current?.offsetWidth ||
										gradient.dimensions.width;

									// Calculate scale factors
									const scaleX =
										previewActualWidth > 0
											? modalActualWidth / previewActualWidth
											: 1;
									const scaleY =
										previewActualHeight > 0
											? modalActualHeight / previewActualHeight
											: 1;

									return (
										<div
											key={video.id}
											className="absolute"
											style={{
												left: `${video.x}%`,
												top: `${video.y}%`,
												width: `${video.width * scaleX}px`,
												height: `${video.height * scaleY}px`,
												transform: "translate(-50%, -50%)",
												zIndex: video.styles?.zIndex || 1,
											}}
										>
											{/* Video Wrapper with all styles */}
											<div
												className="w-full h-full"
												style={{
													borderRadius:
														video.styles?.borderRadius === 100
															? "50%"
															: `${(video.styles?.borderRadius || 0) * scaleY}px`,
													overflow: "hidden",
													borderWidth: `${(video.styles?.borderWidth || 0) * scaleY}px`,
													borderColor: video.styles?.borderColor || "#000000",
													borderStyle: video.styles?.borderStyle || "solid",
													opacity:
														video.styles?.opacity !== undefined
															? video.styles.opacity
															: 1,
													boxShadow:
														video.styles?.shadow === "none" ||
														!video.styles?.shadow
															? "none"
															: video.styles.shadow === "sm"
																? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
																: video.styles.shadow === "md"
																	? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
																	: video.styles.shadow === "lg"
																		? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
																		: video.styles.shadow === "xl"
																			? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
																			: video.styles.shadow === "2xl"
																				? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
																				: "none",
													...(video.styles?.ringWidth > 0 && {
														outline: `${video.styles.ringWidth * scaleY}px solid ${video.styles.ringColor}`,
														outlineOffset: `${2 * scaleY}px`,
													}),
												}}
											>
												<video
													src={video.src}
													alt="Uploaded"
													className="w-full h-full"
													style={{
														objectFit: video.styles?.objectFit || "contain",
													}}
													controls
													loop
													muted
													playsInline
													autoPlay
												/>
											</div>
											{video.caption && (
												<div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-white bg-black bg-opacity-75 px-2 py-1 rounded whitespace-nowrap z-10">
													{video.caption}
												</div>
											)}
										</div>
									);
								})}

								{/* Shape Elements - Modal */}
								{shapes.map((shape) => {
									// Calculate scaling based on actual rendered dimensions
									const modalActualHeight =
										modalPreviewRef.current?.offsetHeight ||
										gradient.dimensions.height;
									const modalActualWidth =
										modalPreviewRef.current?.offsetWidth ||
										gradient.dimensions.width;
									const previewActualHeight =
										previewRef.current?.offsetHeight ||
										gradient.dimensions.height;
									const previewActualWidth =
										previewRef.current?.offsetWidth ||
										gradient.dimensions.width;

									// Calculate scale factors
									const scaleX =
										previewActualWidth > 0
											? modalActualWidth / previewActualWidth
											: 1;
									const scaleY =
										previewActualHeight > 0
											? modalActualHeight / previewActualHeight
											: 1;

									return (
										<div
											key={shape.id}
											className="absolute"
											style={{
												left: `${shape.x}%`,
												top: `${shape.y}%`,
												width: `${shape.width * scaleX}px`,
												height: `${shape.height * scaleY}px`,
												transform: "translate(-50%, -50%)",
												zIndex: shape.styles?.zIndex || 1,
											}}
										>
											<svg
												width="100%"
												height="100%"
												style={{
													opacity: shape.styles?.opacity || 1,
													filter:
														shape.styles?.shadow === "none" ||
														!shape.styles?.shadow
															? "none"
															: shape.styles.shadow === "sm"
																? "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05))"
																: shape.styles.shadow === "md"
																	? "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
																	: shape.styles.shadow === "lg"
																		? "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))"
																		: shape.styles.shadow === "xl"
																			? "drop-shadow(0 20px 25px rgba(0, 0, 0, 0.1))"
																			: shape.styles.shadow === "2xl"
																				? "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))"
																				: "none",
												}}
											>
												{shape.type === "rectangle" && (
													<rect
														x="0"
														y="0"
														width="100%"
														height="100%"
														fill={shape.styles?.fillColor || "#3b82f6"}
														stroke={shape.styles?.strokeColor || "#1e40af"}
														strokeWidth={shape.styles?.strokeWidth || 2}
														rx={shape.styles?.borderRadius || 0}
														ry={shape.styles?.borderRadius || 0}
													/>
												)}
												{shape.type === "square" && (
													<rect
														x="0"
														y="0"
														width="100%"
														height="100%"
														fill={shape.styles?.fillColor || "#3b82f6"}
														stroke={shape.styles?.strokeColor || "#1e40af"}
														strokeWidth={shape.styles?.strokeWidth || 2}
														rx={shape.styles?.borderRadius || 0}
														ry={shape.styles?.borderRadius || 0}
													/>
												)}
												{shape.type === "line" && (
													<line
														x1="0"
														y1="50%"
														x2="100%"
														y2="50%"
														stroke={shape.styles?.strokeColor || "#1e40af"}
														strokeWidth={shape.styles?.strokeWidth || 2}
													/>
												)}
												{shape.type === "triangle" && (
													<polygon
														points={`50%,0 0,100% 100%,100%`}
														fill={shape.styles?.fillColor || "#3b82f6"}
														stroke={shape.styles?.strokeColor || "#1e40af"}
														strokeWidth={shape.styles?.strokeWidth || 2}
													/>
												)}
											</svg>
										</div>
									);
								})}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* AI Chat Assistant - Bottom Center */}
			<AnimatePresence>
				{isAIChatOpen && (
					<motion.div
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 100, opacity: 0 }}
						transition={{ type: "spring", damping: 25, stiffness: 200 }}
						className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4 pb-4"
					>
						<div className="bg-white rounded-t-2xl rounded-b-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[600px]">
							{/* Chat Header */}
							<div className="flex items-center justify-between p-4 border-b border-gray-200 bg-zinc-800 text-white">
								<div className="flex items-center gap-2">
									<Sparkles className="w-5 h-5" />
									<h3 className="font-semibold">AI Assistant</h3>
								</div>
								<div className="flex items-center gap-3">
									{/* Action Toggle Switch */}
									<label className="flex items-center gap-2 text-xs cursor-pointer">
										<span
											className={
												aiActionsEnabled ? "text-white" : "text-zinc-400"
											}
										>
											Actions
										</span>
										<div className="relative">
											<input
												type="checkbox"
												checked={aiActionsEnabled}
												onChange={(e) => setAiActionsEnabled(e.target.checked)}
												className="sr-only"
											/>
											<div
												className={`w-10 h-6 rounded-full transition-colors ${
													aiActionsEnabled ? "bg-zinc-600" : "bg-zinc-700"
												}`}
											>
												<div
													className={`w-4 h-4 bg-white rounded-full transition-transform mt-1 ${
														aiActionsEnabled
															? "translate-x-5 ml-1"
															: "translate-x-1"
													}`}
												/>
											</div>
										</div>
									</label>
									<button
										onClick={() => setIsAIChatOpen(false)}
										className="hover:bg-zinc-700 rounded-full p-1 transition-colors"
									>
										<X className="w-4 h-4" />
									</button>
								</div>
							</div>

							{/* Messages Container */}
							<div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] max-h-[400px]">
								{aiMessages.length === 0 && (
									<div className="text-center text-gray-500 text-sm space-y-2 py-8">
										<Sparkles className="w-8 h-8 mx-auto text-zinc-600" />
										<p className="font-medium">
											Hi! I can help you edit your gradient.
										</p>
										<p className="text-xs mt-4">Try saying:</p>
										<ul className="text-xs space-y-1 text-left max-w-md mx-auto">
											<li>• "Change background to dark"</li>
											<li>• "Create a sun background"</li>
											<li>• "Make a sunset"</li>
											<li>• "Add clouds"</li>
											<li>• "Create mountains"</li>
											<li>• "Make a landscape"</li>
											<li>• "Add a video"</li>
											<li>• "Make text bigger"</li>
											<li>• "Add a red color stop"</li>
											<li>• "Move image to center"</li>
											<li>• "Change gradient to radial"</li>
											<li>• "Add text that says Hello"</li>
										</ul>
									</div>
								)}
								<AnimatePresence>
									{aiMessages.map((message) => (
										<motion.div
											key={message.id}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											transition={{ duration: 0.2 }}
											className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
										>
											<div className="max-w-[80%]">
												<div
													className={`rounded-xl px-4 py-2 ${
														message.role === "user"
															? "bg-zinc-800 text-white"
															: "bg-gray-100 text-gray-800"
													}`}
												>
													<p className="text-sm">{message.content}</p>
												</div>
												{/* Multi-Step Actions Display */}
												{message.hasSteps && aiMultiStepActions.length > 0 && (
													<motion.div
														initial={{ opacity: 0, y: 10 }}
														animate={{ opacity: 1, y: 0 }}
														className="mt-3 p-4 bg-zinc-50 rounded-xl border border-zinc-200"
													>
														<div className="flex items-center justify-between mb-3">
															<h4 className="font-semibold text-sm text-zinc-900">
																Execution Plan ({aiMultiStepActions.length}{" "}
																steps)
															</h4>
															{!isExecutingSteps && (
																<button
																	onClick={executeMultiStepActions}
																	disabled={!aiActionsEnabled}
																	className="px-3 py-1.5 text-xs bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
																>
																	<Sparkles className="w-3 h-3" />
																	Execute All
																</button>
															)}
														</div>
														<div className="space-y-2">
															{aiMultiStepActions.map((action, index) => {
																const isCompleted = aiCompletedSteps.has(index);
																const isCurrent =
																	aiCurrentStep === index + 1 &&
																	isExecutingSteps;
																return (
																	<motion.div
																		key={index}
																		initial={{ opacity: 0, x: -10 }}
																		animate={{ opacity: 1, x: 0 }}
																		className={`flex items-start gap-2 p-2 rounded ${
																			isCompleted
																				? "bg-zinc-50 border border-zinc-200"
																				: isCurrent
																					? "bg-blue-50 border border-blue-200"
																					: "bg-white border border-zinc-200"
																		}`}
																	>
																		<input
																			type="checkbox"
																			checked={isCompleted}
																			readOnly
																			className="mt-1 w-4 h-4 text-zinc-600 border-gray-300 rounded focus:ring-zinc-500"
																		/>
																		<div className="flex-1">
																			<div className="text-xs font-medium text-zinc-700">
																				Step {index + 1}:{" "}
																				{action.description || action.type}
																			</div>
																			{isCurrent && (
																				<div className="text-xs text-blue-600 mt-1 flex items-center gap-1">
																					<div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
																					Executing...
																				</div>
																			)}
																		</div>
																	</motion.div>
																);
															})}
														</div>
														{isExecutingSteps && (
															<div className="mt-3 pt-3 border-t border-zinc-200 text-xs text-zinc-600 flex items-center gap-2">
																<div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
																Executing step {aiCurrentStep} of{" "}
																{aiMultiStepActions.length}...
															</div>
														)}
													</motion.div>
												)}
											</div>
										</motion.div>
									))}
								</AnimatePresence>
								{isAILoading && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="flex justify-start"
									>
										<div className="bg-gray-100 rounded-xl px-4 py-2">
											<div className="flex gap-1">
												<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
												<div
													className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
													style={{ animationDelay: "0.1s" }}
												/>
												<div
													className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
													style={{ animationDelay: "0.2s" }}
												/>
											</div>
										</div>
									</motion.div>
								)}
							</div>

							{/* Input */}
							<div className="p-4 border-t border-gray-200 bg-gray-50">
								<form
									onSubmit={(e) => {
										e.preventDefault();
										handleAIPrompt(aiInput);
									}}
									className="flex gap-2"
								>
									<input
										ref={aiChatInputRef}
										type="text"
										value={aiInput}
										onChange={(e) => setAiInput(e.target.value)}
										placeholder="Ask me to edit your gradient..."
										className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
										disabled={isAILoading}
										onKeyDown={(e) => {
											if (e.key === "Enter" && !e.shiftKey) {
												e.preventDefault();
												if (!isAILoading && aiInput.trim()) {
													handleAIPrompt(aiInput);
												}
											}
										}}
									/>
									<button
										type="submit"
										disabled={isAILoading || !aiInput.trim()}
										className="px-4 py-2 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
									>
										<Send className="w-4 h-4" />
									</button>
								</form>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* AI Chat Toggle Button */}
			{!isAIChatOpen && (
				<div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-40">
					<motion.button
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => setIsAIChatOpen(true)}
						className="w-14 h-14 bg-zinc-800 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-zinc-700 transition-all flex items-center justify-center"
						title="Open AI Assistant"
					>
						<MessageCircle className="w-6 h-6" />
					</motion.button>
					<motion.button
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => {
							setIsImageImprovementOpen(true);
							setImprovementPrompt("");
							setGeneratedImages([]);
						}}
						className="w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-purple-700 transition-all flex items-center justify-center"
						title="Improve Design with AI"
					>
						<Wand2 className="w-6 h-6" />
					</motion.button>
				</div>
			)}

			{/* Keyboard Shortcuts Info Button */}
			<div
				ref={keyboardShortcutsRef}
				className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40"
				style={{ marginLeft: "160px" }}
			>
				<motion.button
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => setIsKeyboardShortcutsOpen(!isKeyboardShortcutsOpen)}
					onMouseEnter={() => setIsKeyboardShortcutsOpen(true)}
					onMouseLeave={() => setIsKeyboardShortcutsOpen(false)}
					className="w-14 h-14 bg-zinc-800 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-zinc-700 transition-all flex items-center justify-center"
					title="Keyboard Shortcuts"
				>
					<Info className="w-6 h-6" />
				</motion.button>

				<AnimatePresence>
					{isKeyboardShortcutsOpen && (
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.2 }}
							className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 bg-white rounded-xl shadow-2xl border border-zinc-200 p-4 z-50"
							onMouseEnter={() => setIsKeyboardShortcutsOpen(true)}
							onMouseLeave={() => setIsKeyboardShortcutsOpen(false)}
						>
							<h3 className="text-lg font-semibold mb-3 text-zinc-900">
								Keyboard Shortcuts
							</h3>
							<div className="space-y-2 text-sm">
								<div className="flex items-center justify-between py-1">
									<span className="text-zinc-600">Add Elements:</span>
								</div>
								<div className="grid grid-cols-2 gap-2 mt-2">
									<div className="flex items-center justify-between p-2 bg-zinc-50 rounded">
										<span className="text-zinc-700">Rectangle</span>
										<kbd className="px-2 py-1 bg-zinc-200 text-zinc-800 rounded text-xs font-mono">
											R
										</kbd>
									</div>
									<div className="flex items-center justify-between p-2 bg-zinc-50 rounded">
										<span className="text-zinc-700">Square</span>
										<kbd className="px-2 py-1 bg-zinc-200 text-zinc-800 rounded text-xs font-mono">
											S
										</kbd>
									</div>
									<div className="flex items-center justify-between p-2 bg-zinc-50 rounded">
										<span className="text-zinc-700">Image</span>
										<kbd className="px-2 py-1 bg-zinc-200 text-zinc-800 rounded text-xs font-mono">
											I
										</kbd>
									</div>
									<div className="flex items-center justify-between p-2 bg-zinc-50 rounded">
										<span className="text-zinc-700">Video</span>
										<kbd className="px-2 py-1 bg-zinc-200 text-zinc-800 rounded text-xs font-mono">
											V
										</kbd>
									</div>
									<div className="flex items-center justify-between p-2 bg-zinc-50 rounded">
										<span className="text-zinc-700">Line</span>
										<kbd className="px-2 py-1 bg-zinc-200 text-zinc-800 rounded text-xs font-mono">
											L
										</kbd>
									</div>
									<div className="flex items-center justify-between p-2 bg-zinc-50 rounded">
										<span className="text-zinc-700">Text</span>
										<kbd className="px-2 py-1 bg-zinc-200 text-zinc-800 rounded text-xs font-mono">
											A
										</kbd>
									</div>
									<div className="flex items-center justify-between p-2 bg-zinc-50 rounded">
										<span className="text-zinc-700">Triangle</span>
										<kbd className="px-2 py-1 bg-zinc-200 text-zinc-800 rounded text-xs font-mono">
											T
										</kbd>
									</div>
								</div>
								<div className="mt-3 pt-3 border-t border-zinc-200">
									<div className="flex items-center justify-between p-2 bg-zinc-50 rounded">
										<span className="text-zinc-700">Delete Selected</span>
										<div className="flex gap-1">
											<kbd className="px-2 py-1 bg-zinc-200 text-zinc-800 rounded text-xs font-mono">
												Delete
											</kbd>
											<span className="text-zinc-500">/</span>
											<kbd className="px-2 py-1 bg-zinc-200 text-zinc-800 rounded text-xs font-mono">
												Backspace
											</kbd>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* MP4 Generation Loading Modal */}
			<AnimatePresence>
				{isGeneratingMP4 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
					>
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
						>
							<div className="text-center">
								<div className="mb-4">
									<div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
								</div>
								<h3 className="text-xl font-semibold mb-2">
									Generating MP4 Video
								</h3>
								<p className="text-gray-600 mb-4">
									{mp4Progress < 20
										? "Initializing..."
										: mp4Progress < 70
											? "Recording frames..."
											: mp4Progress < 90
												? "Converting to MP4..."
												: "Finalizing..."}
								</p>
								<div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
									<div
										className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
										style={{ width: `${mp4Progress}%` }}
									></div>
								</div>
								<p className="text-sm text-gray-500">
									{Math.round(mp4Progress)}%
								</p>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Image Improvement Modal */}
			<AnimatePresence>
				{isImageImprovementOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
						onClick={() => setIsImageImprovementOpen(false)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="flex items-center justify-between p-4 border-b border-gray-200 bg-purple-600 text-white">
								<div className="flex items-center gap-2">
									<Wand2 className="w-5 h-5" />
									<h3 className="font-semibold">AI Image Improvement</h3>
								</div>
								<button
									onClick={() => setIsImageImprovementOpen(false)}
									className="hover:bg-purple-700 rounded-full p-1 transition-colors"
								>
									<X className="w-4 h-4" />
								</button>
							</div>

							{/* Content */}
							<div className="flex-1 overflow-y-auto p-6">
								{/* Prompt Input */}
								<div className="mb-6">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Improvement Prompt
									</label>
									<textarea
										ref={improvementPromptRef}
										value={improvementPrompt}
										onChange={(e) => setImprovementPrompt(e.target.value)}
										placeholder="E.g., 'Make it more vibrant', 'Add more depth', 'Enhance colors', 'Make it more modern'"
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
										rows={3}
										disabled={generateImprovedImages.isPending}
										onKeyDown={(e) => {
											if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
												e.preventDefault();
												if (
													!generateImprovedImages.isPending &&
													improvementPrompt.trim()
												) {
													handleGenerateImages();
												}
											}
										}}
									/>
									<button
										onClick={handleGenerateImages}
										disabled={
											generateImprovedImages.isPending ||
											!improvementPrompt.trim()
										}
										className="mt-3 w-full px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
									>
										{generateImprovedImages.isPending ? (
											<>
												<Loader2 className="w-4 h-4 animate-spin" />
												Generating Images...
											</>
										) : (
											<>
												<Wand2 className="w-4 h-4" />
												Generate 5 Variations
											</>
										)}
									</button>
								</div>

								{/* Generated Images Grid */}
								{generatedImages.length > 0 && (
									<div>
										<h4 className="text-sm font-semibold text-gray-700 mb-4">
											Generated Variations ({generatedImages.length})
										</h4>
										<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
											{generatedImages.map((imageData, index) => (
												<motion.div
													key={index}
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ delay: index * 0.1 }}
													className="relative group border border-gray-200 rounded-xl overflow-hidden bg-gray-100"
												>
													<img
														src={imageData}
														alt={`Improved variation ${index + 1}`}
														className="w-full h-auto object-contain"
														onError={(e) => {
															e.target.src =
																"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f3f4f6' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='14'%3EFailed to load%3C/text%3E%3C/svg%3E";
														}}
													/>
													<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
														<button
															onClick={() => {
																const link = document.createElement("a");
																link.href = imageData;
																link.download = `improved-gradient-${index + 1}.png`;
																link.click();
															}}
															className="px-4 py-2 bg-white text-gray-800 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2"
														>
															<Download className="w-4 h-4" />
															Download
														</button>
													</div>
												</motion.div>
											))}
										</div>
									</div>
								)}

								{/* Empty State */}
								{generatedImages.length === 0 &&
									!generateImprovedImages.isPending && (
										<div className="text-center text-gray-500 py-12">
											<ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
											<p className="text-sm">
												Enter a prompt and click generate to create improved
												variations
											</p>
										</div>
									)}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* URL Screenshot Modal */}
			<AnimatePresence>
				{isUrlScreenshotOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
						onClick={() => setIsUrlScreenshotOpen(false)}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="flex items-center justify-between p-4 border-b border-gray-200 text-black">
								<div className="flex items-center gap-2">
									<Camera className="w-5 h-5" />
									<h3 className="font-semibold">URL Screenshot</h3>
								</div>
								<button
									onClick={() => setIsUrlScreenshotOpen(false)}
									className="hover:bg-zinc-100 rounded-full p-1 transition-colors"
								>
									<X className="w-4 h-4" />
								</button>
							</div>

							{/* Content */}
							<div className="flex-1 overflow-y-auto p-6">
								{/* URL Input */}
								<div className="mb-6">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Website URL
									</label>
									<div className="flex gap-2">
										<input
											ref={urlInputRef}
											type="url"
											value={urlInput}
											onChange={(e) => setUrlInput(e.target.value)}
											placeholder="https://example.com"
											className="flex-1 px-2 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-200 text-sm"
											disabled={isScreenshotLoading}
											onKeyDown={(e) => {
												if (
													e.key === "Enter" &&
													!isScreenshotLoading &&
													urlInput.trim()
												) {
													e.preventDefault();
													handleUrlScreenshot();
												}
											}}
										/>
										<button
											onClick={handleUrlScreenshot}
											disabled={isScreenshotLoading || !urlInput.trim()}
											className="px-6 py-3 bg-zinc-800 text-white rounded-xl hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
										>
											{isScreenshotLoading ? (
												<>
													<Loader2 className="w-4 h-4 animate-spin" />
													Capturing...
												</>
											) : (
												<>
													<Camera className="w-4 h-4" />
													Capture
												</>
											)}
										</button>
									</div>
									<p className="text-xs text-gray-500 mt-2">
										Enter a valid URL (e.g., https://example.com) and click
										Capture
									</p>
								</div>

								{/* Screenshot Preview */}
								{screenshotImage && (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										className="mb-6"
									>
										<h4 className="text-sm font-semibold text-gray-700 mb-4">
											Screenshot Preview
										</h4>
										<div className="relative border border-gray-200 rounded-xl overflow-hidden bg-gray-100">
											<img
												src={screenshotImage}
												alt="Screenshot preview"
												className="w-full h-auto object-contain max-h-[60vh]"
												onError={(e) => {
													e.target.src =
														"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f3f4f6' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='14'%3EFailed to load%3C/text%3E%3C/svg%3E";
												}}
											/>
										</div>
										<button
											onClick={handleAddScreenshotToCanvas}
											className="mt-4 w-full px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2"
										>
											<ImageIcon className="w-4 h-4" />
											Add Image to Canvas
										</button>
									</motion.div>
								)}

								{/* Empty State */}
								{!screenshotImage && !isScreenshotLoading && (
									<div className="text-center text-gray-500 py-12">
										<Globe className="w-12 h-12 mx-auto mb-4 text-gray-400" />
										<p className="text-sm">
											Enter a URL and click Capture to generate a screenshot
										</p>
									</div>
								)}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default AnimatedGradientGenerator;
