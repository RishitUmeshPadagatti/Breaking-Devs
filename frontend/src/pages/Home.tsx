import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2 } from 'lucide-react';

export function Home() {
	const [prompt, setPrompt] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (prompt.trim()) {
			navigate('/builder', { state: { prompt } });
		}
	};

	const [selectedModel, setSelectedModel] = useState("gpt-4o");

	return (
		<div className="min-h-screen flex items-end justify-center pb-28">
			<div className="max-w-2xl w-full">
				<div className="text-center mb-8 cursor-default">
					<h1 className="text-4xl font-bold mb-4">
						<span className="text-purple-700">WARP</span> - Website Builder AI
					</h1>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="bg-gray-100 rounded-lg shadow-2xl p-6">
						<textarea
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
							placeholder="Describe the website you want to build..."
							className="w-full h-28 p-4 rounded-lg focus:border-transparent resize-none text-black placeholder-gray-500 focus:ring-black focus:border-black"
						/>

						{/* Selection Dropdown */}
						<div className="mt-4">
							<label htmlFor="model" className="block text-sm font-medium text-gray-700">
								Select Model
							</label>
							<select
								id="model"
								value={selectedModel}
								onChange={(e) => setSelectedModel(e.target.value)}
								className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-white text-black focus:ring-black focus:border-black"
							>
								<option value="chatgpt">gpt-4o</option>
								<option value="chatgpt">gpt-4o-mini</option>
								<option value="chatgpt">gpt-3.5-turbo</option>
								<option value="anthropic">claude-3-5-sonnet-20241022</option>
								<option value="anthropic">claude-3-5-haiku-20241022</option>
							</select>
						</div>

						<button
							type="submit"
							className="w-full mt-4 bg-black text-gray-100 py-3 px-6 rounded-lg font-semibold cursor-pointer"
						>
							Generate
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}