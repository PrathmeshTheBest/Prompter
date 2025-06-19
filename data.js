// data.js

export const categoriesData = [
    // Manual Mode Categories - These map directly to preset keywords
    {
        id: 'subject-details',
        header: 'Subject Details',
        description: 'Specific attributes of the main subject. (e.g., "Majestic, Ancient, Glowing")',
        imageUrl: 'https://placehold.co/250x180/E7B5A7/000000?text=Subject+Details', // Placeholder image URL
        options: {
            'Adjectives': ['Majestic', 'Tiny', 'Ancient', 'Modern', 'Futuristic', 'Worn', 'Pristine', 'Glowing', 'Dark', 'Bright', 'Fierce', 'Gentle', 'Elegant', 'Rugged', 'Delicate', 'Twisted', 'Smooth', 'Rough', 'Organic', 'Geometric', 'Robotic', 'Humanoid', 'Abstract', 'Ethereal', 'Solid', 'Liquid', 'Gaseous', 'Broken', 'Repaired', 'Sparkling', 'Dull', 'Vibrant', 'Muted', 'Transparent', 'Opaque', 'Intricate', 'Ornate', 'Highly Detailed', 'Sleek', 'Bold', 'Intense', 'Young', 'Energetic', 'Smiling', 'Active', 'Mature', 'Thoughtful', 'Calm', 'Wise', 'Wrinkled', 'Strong', 'Confident', 'Fashionable', 'Stylish'], // Added terms for human subjects
            'Colors': ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Black', 'White', 'Grey', 'Brown', 'Gold', 'Silver', 'Bronze', 'Rainbow', 'Monochromatic'],
            'Material/Texture': ['Metallic', 'Wooden', 'Stone', 'Glass', 'Fabric', 'Fur', 'Skin', 'Water', 'Ice', 'Fire', 'Smoke', 'Cloud', 'Crystal', 'Plastic', 'Rubber', 'Leather', 'Concrete', 'Paper', 'Cloth', 'Silk', 'Velvet', 'Carbon Fiber'],
            'Condition': ['New', 'Old', 'Damaged', 'Pristine', 'Rusty', 'Mossy', 'Glowing', 'Broken', 'Repaired', 'Burning', 'Wet', 'Dry', 'Frozen', 'Melted', 'Growing', 'Dying']
        }
    },
    {
        id: 'action-pose-expression',
        header: 'Action/State',
        description: 'What the subject is doing or its current state. (e.g., "Running, Joyful, Leaping")',
        imageUrl: 'https://placehold.co/250x180/A7E7CB/000000?text=Action+State', // Placeholder image URL
        options: {
            'Verbs (Active)': ['Running', 'Jumping', 'Flying', 'Swimming', 'Standing', 'Sitting', 'Lying', 'Roaring', 'Whispering', 'Dancing', 'Fighting', 'Building', 'Destroying', 'Eating', 'Drinking', 'Reading', 'Writing', 'Painting', 'Exploring', 'Discovering', 'Hiding', 'Chasing', 'Escaping', 'Floating', 'Sinking', 'Growing', 'Shrinking', 'Exploding', 'Collapsing', 'Blending', 'Forming'],
            'Expressions (for living subjects)': ['Smiling', 'Frowning', 'Laughing', 'Crying', 'Angry', 'Happy', 'Sad', 'Surprised', 'Calm', 'Determined', 'Confused', 'Scared', 'Joyful', 'Thoughtful', 'Peaceful', 'Stressed', 'Relaxed', 'Curious', 'Bored', 'Excited'],
            'Poses (for living subjects/objects)': ['Leaping', 'Crouching', 'Stretching', 'Resting', 'Alert', 'Playful', 'Aggressive', 'Defensive', 'Elegant', 'Awkward', 'Dynamic', 'Static', 'Balanced', 'Unbalanced', 'Suspended', 'Grounded']
        }
    },
    {
        id: 'environment-setting',
        header: 'Environment',
        description: 'The background or location of the subject. (e.g., "Forest, Night, Rainy")',
        imageUrl: 'https://placehold.co/250x180/C7A7E7/000000?text=Environment', // Placeholder image URL
        options: {
            'Type': ['Forest', 'Desert', 'Mountain', 'Ocean', 'Lake', 'River', 'City', 'Town', 'Village', 'Space', 'Alien Planet', 'Underwater', 'Sky', 'Clouds', 'Volcano', 'Cave', 'Ruins', 'Castle Interior', 'Modern Apartment', 'Ancient Temple', 'Sci-Fi Lab', 'Cyberpunk Alley', 'Steampunk City', 'Post-Apocalyptic Wasteland', 'Dreamscape', 'Abstract Background', 'Studio', 'Museum', 'Art Gallery', 'Battlefield', 'School', 'Library', 'Office', 'Crowded', 'Outdoors', 'Interior'], // Added terms for human environments
            'Time of Day': ['Dawn', 'Morning', 'Midday', 'Afternoon', 'Dusk', 'Night', 'Midnight'],
            'Weather/Atmosphere': ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Foggy', 'Misty', 'Stormy', 'Clear', 'Hazy', 'Windy', 'Calm', 'Thunder', 'Lightning', 'Rainbow', 'Aurora', 'Blizzard', 'Dust Storm'],
            'Season': ['Spring', 'Summer', 'Autumn (Fall)', 'Winter'],
            'Specific Elements': ['Trees', 'Rocks', 'Water', 'Buildings', 'Vehicles', 'People', 'Animals', 'Plants', 'Stars', 'Moons', 'Plantes', 'Alien Flora', 'Ancient Artifacts', 'Futuristic Technology', 'Debris', 'Smoke', 'Fire', 'Ice Formations', 'Lava', 'Shadows']
        }
    },
    {
        id: 'lighting',
        header: 'Lighting',
        description: 'The characteristics of light in the scene. (e.g., "Soft, Cinematic, From Above")',
        imageUrl: 'https://placehold.co/250x180/A7DDE7/000000?text=Lighting', // Placeholder image URL
        options: {
            'Type': ['Natural Light', 'Artificial Light', 'Studio Lighting', 'Cinematic Lighting', 'Volumetric Lighting', 'Global Illumination', 'Ambient Occlusion', 'Rim Lighting', 'Backlighting', 'Side Lighting', 'Front Lighting', 'Top-Down Lighting', 'Bottom-Up Lighting', 'Spotlight', 'Floodlight', 'Neon Glow', 'Bioluminescence', 'Luminous', 'Moonlight', 'Sunlight', 'Starlight', 'Firelight', 'Candlelight', 'Electric Light', 'LED Lighting'],
            'Quality': ['Soft', 'Harsh', 'Diffused', 'Sharp', 'Bright', 'Dim', 'Moody', 'Ethereal', 'Dramatic', 'Mysterious', 'Warm', 'Cool', 'Cold', 'Vibrant', 'Muted', 'Glimmering', 'Shimmering', 'Pulsating', 'Flickering', 'Balanced', 'Contrasting Light'], // Added terms for human lighting
            'Direction': ['From Above', 'From Below', 'From Left', 'From Right', 'From Front', 'From Back', 'All Around']
        }
    },
    {
        id: 'style-art-medium',
        header: 'Art Style',
        description: 'The artistic aesthetic or medium of the image. (e.g., "Photorealistic, Oil Painting, Cyberpunk")',
        imageUrl: 'https://placehold.co/250x180/E7A7A7/000000?text=Art+Style', // Placeholder image URL
        options: {
            'Art Mediums': ['Photorealistic', 'Digital Art', 'Concept Art', 'Oil Painting', 'Watercolor', 'Acrylic Painting', 'Pencil Sketch', 'Charcoal Drawing', 'Ink Drawing', 'Pastel Art', '3D Render', 'Pixel Art', 'Vector Art', 'Claymation', 'Stop Motion', 'Embroidery', 'Mosaic', 'Stained Glass'],
            'Artistic Movements': ['Impressionism', 'Surrealism', 'Cubism', 'Abstract Expressionism', 'Pop Art', 'Art Nouveau', 'Baroque', 'Renaissance', 'Romanticism', 'Minimalism', 'Futurism', 'Dadaism'],
            'Visual Styles': ['Anime', 'Manga', 'Cartoon', 'Comic Book Art', 'Realistic', 'Hyperrealistic', 'Stylized', 'Abstract', 'Sci-Fi', 'Fantasy', 'Cyberpunk', 'Steampunk', 'Dieselpunk', 'Biopunk', 'Solarpunk', 'Retro-futurism', 'Vintage', 'Grunge', 'Gothic', 'Rustic', 'Industrial', 'Sleek', 'Futuristic', 'Whimsical', 'Dark Fantasy', 'High Fantasy', 'Low Poly', 'Vaporwave', 'Glitch Art', 'ASCII Art', 'Psychedelic', 'Street Art', 'Graffiti'],
            'Photography Specifics': ['Macro Photography', 'Wide Angle', 'Telephoto Lens', 'Tilt-Shift', 'Bokeh', 'Shallow Depth of Field', 'Long Exposure', 'HDR', 'Fisheye Lens', 'Anamorphic Lens', 'Lens Flare', 'Portrait']
        }
    },
    {
        id: 'composition-perspective',
        header: 'Composition',
        description: 'How the image is framed and viewed. (e.g., "Close-up, Eye-level, Rule of Thirds")',
        imageUrl: 'https://placehold.co/250x180/E7DDA7/000000?text=Composition', // Placeholder image URL
        options: {
            'Shot Type': ['Close-up', 'Medium Shot', 'Full Shot', 'Wide Shot', 'Extreme Wide Shot', 'Panoramic', 'Macro Shot', 'Portrait', 'Landscape', 'Group Shot'],
            'Angle': ['Eye-level', 'Low Angle', 'High Angle', 'Overhead (Top-down)', 'Worm\'s Eye View', 'Bird\'s Eye View', 'Dutch Angle (Canted)'],
            'Focus': ['Sharp Focus', 'Soft Focus', 'Shallow Depth of Field', 'Deep Depth of Field', 'Blurry Background', 'Clear Background'],
            'Framing': ['Rule of Thirds', 'Golden Ratio', 'Centered', 'Off-center', 'Symmetrical', 'Asymmetrical', 'Leading Lines', 'Negative Space', 'Foreground Elements', 'Background Elements'],
            'Movement': ['Dynamic Composition', 'Static Composition', 'Motion Blur', 'Panning Shot']
        }
    },
    {
        id: 'quality-detail',
        header: 'Quality',
        description: 'Terms to enhance the overall fidelity and rendering of the image. (e.g., "8K, Ultra Detailed, Cinematic")',
        imageUrl: 'https://placehold.co/250x180/A7BDE7/000000?text=Quality+Detail', // Placeholder image URL
        options: {
            'Resolution': ['8K', '4K', 'Ultra HD', 'High Resolution'],
            'Detail Level': ['Highly Detailed', 'Ultra Detailed', 'Intricate Details', 'Fine Details', 'Complex', 'Simple'],
            'Rendering Engines (implies quality)': ['Unreal Engine 5', 'Octane Render', 'V-Ray', 'Arnold Render', 'Redshift', 'Cycles Render'],
            'General Quality Terms': ['Masterpiece', 'Best Quality', 'High Quality', 'Photorealistic Render', 'Studio Quality', 'Cinematic', 'Epic', 'Grand', 'Majestic', 'Immersive', 'Vivid', 'Crisp', 'Sharp', 'Clear', 'Smooth', 'Polished', 'Gritty', 'Raw'],
            'Color Quality': ['Vibrant Colors', 'Rich Colors', 'Muted Colors', 'Desaturated Colors', 'Monochromatic', 'Pastel Colors', 'Warm Tones', 'Cool Tones', 'Earth Tones']
        }
    }
];

export const presetsCategoriesData = [
    // Presets for Subject Details (combining adjectives, materials, etc. for a practical look)
    {
        id: 'preset-subject-details',
        header: 'Subject Attributes',
        description: 'Curated sets of adjectives and material descriptions for your main subject.',
        targetCategory: 'subject-details', // The manual category this preset targets
        options: [
            {
                name: 'Vibrant & Modern',
                keywords: ['Vibrant', 'Sleek', 'Geometric', 'Metallic', 'Bright'],
                imageUrl: 'c1/1.jpg'
            },
            {
                name: 'Aged & Textured',
                keywords: ['Ancient', 'Worn', 'Rusty', 'Rough', 'Mossy', 'Stone'],
                imageUrl: 'c1/2.jpg'
            },
            {
                name: 'Delicate & Ethereal',
                keywords: ['Delicate', 'Transparent', 'Glowing', 'Ethereal', 'Soft', 'Glass'],
                imageUrl: 'c1/3.jpg'
            },
            {
                name: 'Rugged & Durable',
                keywords: ['Rugged', 'Damaged', 'Leather', 'Concrete', 'Worn'],
                imageUrl: 'c1/4.jpg'
            },
            {
                name: 'Organic & Natural',
                keywords: ['Organic', 'Wooden', 'Mossy', 'Green', 'Smooth'],
                imageUrl: 'c1/5.jpg'
            },
            {
                name: 'Industrial & Grimy',
                keywords: ['Industrial', 'Gritty', 'Metallic', 'Rusty', 'Damaged'],
                imageUrl: 'c1/6.jpg'
            },
            {
                name: 'Luxurious & Polished',
                keywords: ['Pristine', 'Polished', 'Gold', 'Silver', 'Smooth', 'Elegant'],
                imageUrl: 'c1/7.jpg'
            },
            // NEW Human Subject Presets
            { name: 'Young & Energetic Human', keywords: ['Young', 'Vibrant', 'Energetic', 'Smiling', 'Active'], imageUrl: 'c1/8.jpg' },
            { name: 'Mature & Thoughtful Human', keywords: ['Mature', 'Thoughtful', 'Calm', 'Wise', 'Wrinkled'], imageUrl: 'c1/9.jpg' },
            { name: 'Heroic & Determined Human', keywords: ['Fierce', 'Determined', 'Strong', 'Bold', 'Confident'], imageUrl: 'c1/10.jpg' },
            { name: 'Fashionable & Stylish Human', keywords: ['Elegant', 'Sleek', 'Modern', 'Pristine', 'Vibrant'], imageUrl: 'c1/11.jpg' },
            { name: 'Average Person', keywords: ['Normal', 'Casual', 'Everyday'], imageUrl: 'c1/12.jpg' } // More basic, practical
        ]
    },
    // NEW Presets for Action/Pose/Expression for Human Subjects
    {
        id: 'preset-action-pose-expression',
        header: 'Human Action & Pose',
        description: 'Common poses, actions, and expressions for human subjects.',
        targetCategory: 'action-pose-expression',
        options: [
            { name: 'Dynamic Action Pose', keywords: ['Leaping', 'Running', 'Fighting', 'Dynamic Composition', 'Motion Blur'], imageUrl: 'c2/1.jpg' },
            { name: 'Calm & Relaxed Pose', keywords: ['Resting', 'Sitting', 'Peaceful', 'Calm', 'Relaxed'], imageUrl: 'c2/2.jpg' },
            { name: 'Confident Stance', keywords: ['Standing', 'Alert', 'Determined', 'Bold'], imageUrl: 'c2/3.jpg' },
            { name: 'Candid Everyday Moment', keywords: ['Reading', 'Drinking', 'Laughing', 'Natural Light'], imageUrl: 'c2/4.jpg' },
            { name: 'Intense Focused Expression', keywords: ['Angry', 'Determined', 'Intense', 'Sharp Focus'], imageUrl: 'c2/5.jpg' },
            { name: 'Joyful & Expressive', keywords: ['Smiling', 'Laughing', 'Joyful', 'Vibrant'], imageUrl: 'c2/6.jpg' },
            { name: 'Thoughtful Gaze', keywords: ['Thoughtful', 'Calm', 'Pensive'], imageUrl: 'c2/7.jpg' },
            { name: 'Dancing Gracefully', keywords: ['Dancing', 'Elegant', 'Dynamic'], imageUrl: 'c2/8.jpg' }
        ]
    },
    // Presets for Environment Setting
    {
        id: 'preset-environment-setting', // Maps to manual 'environment-setting'
        header: 'Environment & Atmosphere',
        description: 'Common environmental scenes with typical weather/time conditions.',
        targetCategory: 'environment-setting',
        options: [
            {
                name: 'Urban Night Scene',
                keywords: ['City', 'Night', 'Rainy', 'Cyberpunk Alley', 'Buildings', 'Neon Glow'],
                imageUrl: 'c3/1.jpg'
            },
            {
                name: 'Sunny Forest Day',
                keywords: ['Forest', 'Morning', 'Sunny', 'Clear', 'Trees', 'Plants', 'Natural Light', 'Warm'],
                imageUrl: 'c3/2.jpg'
            },
            {
                name: 'Misty Mountain Dawn',
                keywords: ['Mountain', 'Dawn', 'Foggy', 'Misty', 'Clear', 'Ethereal'],
                imageUrl: 'c3/3.jpg'
            },
            {
                name: 'Desert Sunset',
                keywords: ['Desert', 'Dusk', 'Hazy', 'Warm Tones', 'Silhouetted'],
                imageUrl: 'c3/4.jpg'
            },
            {
                name: 'Underwater Reef',
                keywords: ['Underwater', 'Ocean', 'Clear', 'Vivid Colors', 'Plants', 'Bioluminescence'],
                imageUrl: 'c3/5.jpg'
            },
            {
                name: 'Sci-Fi Laboratory',
                keywords: ['Sci-Fi Lab', 'Futuristic', 'Artificial Light', 'Sleek', 'Glowing'],
                imageUrl: 'c3/6.jpg'
            },
            {
                name: 'Cozy Cabin Interior',
                keywords: ['Wooden', 'Interior', 'Warm Light', 'Comfortable'],
                imageUrl: 'c3/7.jpg'
            },
            // NEW Human Environment Presets
            { name: 'Busy Street Market', keywords: ['City', 'Crowded', 'Day', 'Vibrant', 'Outdoors'], imageUrl: 'c3/8.jpg' },
            { name: 'Minimalist Studio Backdrop', keywords: ['Studio', 'Simple', 'Clean', 'Smooth', 'White'], imageUrl: 'c3/9.jpg' },
            { name: 'Lush Garden Backdrop', keywords: ['Plants', 'Green', 'Sunny', 'Outdoors', 'Natural Light'], imageUrl: 'c3/10.jpg' },
            { name: 'Historic Alleyway', keywords: ['City', 'Old', 'Stone', 'Damaged', 'Gritty', 'Industrial'], imageUrl: 'c3/11.jpg' },
            { name: 'Modern Office Space', keywords: ['Office', 'Modern', 'Sleek', 'Artificial Light'], imageUrl: 'c3/12.jpg' },
            { name: 'Beach Sunset', keywords: ['Ocean', 'Dusk', 'Warm Tones', 'Clear'], imageUrl: 'c3/13.jpg' }
        ]
    },
    // Presets for Lighting
    {
        id: 'preset-lighting', // Maps to manual 'lighting'
        header: 'Lighting',
        description: 'Apply specific lighting types and qualities.',
        targetCategory: 'lighting',
        options: [
            {
                name: 'Dramatic Backlighting',
                keywords: ['Backlighting', 'Dramatic', 'Sharp', 'Rim Lighting'],
                imageUrl: 'c4/1.jpg'
            },
            {
                name: 'Soft Studio Lighting',
                keywords: ['Studio Lighting', 'Soft', 'Diffused', 'Ambient Occlusion'],
                imageUrl: 'c4/2.jpg'
            },
            {
                name: 'Golden Hour Glow',
                keywords: ['Natural Light', 'Warm', 'Soft', 'Glimmering', 'Sunlight'],
                imageUrl: 'c4/3.jpg'
            },
            {
                name: 'Harsh Top-Down',
                keywords: ['Harsh', 'Top-Down Lighting', 'Sharp', 'Moody'],
                imageUrl: 'c4/4.jpg'
            },
            {
                name: 'Neon & Electric',
                keywords: ['Neon Glow', 'Electric Light', 'Vibrant', 'Cool', 'Pulsating'],
                imageUrl: 'c4/5.jpg'
            },
            {
                name: 'Mysterious Shadow Play',
                keywords: ['Dim', 'Moody', 'Mysterious', 'Shadows', 'Contrasting Light'],
                imageUrl: 'c4/6.jpg'
            },
            {
                name: 'Volumetric & Hazy',
                keywords: ['Volumetric Lighting', 'Hazy', 'Diffused', 'Ethereal'],
                imageUrl: 'c4/7.jpg'
            },
            // NEW Human Lighting Presets
            { name: 'Key & Fill Lighting', keywords: ['Studio Lighting', 'Balanced', 'Soft', 'Clear'], imageUrl: 'c4/8.jpg' },
            { name: 'Chiaroscuro (Dramatic Contrast)', keywords: ['Dramatic', 'Harsh', 'Dark', 'Contrasting Light', 'Shadows'], imageUrl: 'c4/9.jpg' },
            { name: 'Soft Window Light', keywords: ['Natural Light', 'Soft', 'Diffused', 'Warm'], imageUrl: 'c4/10.jpg' },
            { name: 'High-Key Brightness', keywords: ['Bright', 'Soft', 'Diffused', 'High Quality'], imageUrl: 'c4/11.jpg' }, // For brighter portraits
            { name: 'Low-Key Mood', keywords: ['Dim', 'Moody', 'Dark', 'Dramatic'], imageUrl: 'c4/12.jpg' } // For darker, more intense portraits
        ]
    },
    // Presets for Art Style & Quality
    {
        id: 'preset-style-art-medium', // Maps to manual 'style-art-medium'
        header: 'Art Style',
        description: 'Choose popular artistic aesthetics and rendering techniques.',
        targetCategory: 'style-art-medium',
        options: [
            {
                name: 'Photorealism Standard',
                keywords: ['Photorealistic', 'High Quality', 'Detailed'],
                imageUrl: 'c5/1.jpg'
            },
            {
                name: 'Digital Painting Style',
                keywords: ['Digital Art', 'Concept Art', 'Oil Painting', 'Vivid Colors'],
                imageUrl: 'c5/2.jpg'
            },
            {
                name: 'Clean Vector Art',
                keywords: ['Vector Art', 'Minimalism', 'Sleek', 'Smooth'],
                imageUrl: 'c5/3.jpg'
            },
            {
                name: 'Gritty Comic Book',
                keywords: ['Comic Book Art', 'Grunge', 'Sharp', 'Muted Colors'],
                imageUrl: 'c5/4.jpg'
            },
            {
                name: 'Classic Oil Painting',
                keywords: ['Oil Painting', 'Baroque', 'Rich Colors', 'Textured'],
                imageUrl: 'c5/5.jpg'
            },
            {
                name: 'Anime Aesthetic',
                keywords: ['Anime', 'Stylized', 'Vibrant Colors'],
                imageUrl: 'c5/6.jpg'
            },
            {
                name: 'Architectural Render',
                keywords: ['3D Render', 'Realistic', 'Clean', 'Modern'],
                imageUrl: 'c5/7.jpg'
            },
            // NEW Human Portrait/Subject Art Style Presets
            { name: 'Realistic Portrait Photography', keywords: ['Photorealistic', 'Studio Quality', 'Sharp Focus', 'Portrait'], imageUrl: 'c5/8.jpg' },
            { name: 'Charcoal Sketch Portrait', keywords: ['Charcoal Drawing', 'Pencil Sketch', 'Monochromatic', 'Rough'], imageUrl: 'c5/9.jpg' },
            { name: 'Abstract Figure Art', keywords: ['Abstract', 'Stylized', 'Digital Art', 'Vibrant Colors'], imageUrl: 'c5/10.jpg' },
            { name: 'Impressionistic Portrait', keywords: ['Impressionism', 'Oil Painting', 'Soft Focus', 'Dreamscape'], imageUrl: 'c5/11.jpg' },
            { name: 'Pop Art Portrait', keywords: ['Pop Art', 'Vibrant Colors', 'Bold', 'Graphic'], imageUrl: 'c5/12.jpg' },
            { name: 'Watercolor Portrait', keywords: ['Watercolor', 'Soft', 'Ethereal'], imageUrl: 'c5/13.jpg' },
            { name: 'Detailed Character Concept', keywords: ['Concept Art', 'Highly Detailed', 'Intricate Details'], imageUrl: 'c5/14.jpg' }
        ]
    },
     {
        id: 'preset-quality-detail', // Maps to manual 'quality-detail'
        header: 'Quality & Detail',
        description: 'Common quality and detail enhancements.',
        targetCategory: 'quality-detail',
        options: [
            {
                name: 'Ultra High Detail',
                keywords: ['8K', 'Ultra Detailed', 'Photorealistic Render'],
                imageUrl: 'c6/1.jpg'
            },
            {
                name: 'Cinematic Quality',
                keywords: ['Cinematic', 'Epic', 'Immersive', 'Crisp', 'Sharp'],
                imageUrl: 'c6/2.jpg'
            },
            {
                name: 'Vibrant & Polished',
                keywords: ['Vibrant Colors', 'Smooth', 'Polished', 'High Quality'],
                imageUrl: 'c6/3.jpg'
            },
            {
                name: 'Raw & Gritty',
                keywords: ['Gritty', 'Raw', 'Rough', 'Muted Colors'],
                imageUrl: 'c6/4.jpg'
            },
            {
                name: 'Subtle Details',
                keywords: ['Fine Details', 'Delicate', 'Soft Focus'],
                imageUrl: 'c6/5.jpg'
            },
            {
                name: 'Expressive Colors',
                keywords: ['Rich Colors', 'Bold', 'High Contrast', 'Vivid'],
                imageUrl: 'c6/6.jpg'
            },
            // NEW Human Subject Quality Presets
            { name: 'Skin Texture Realism', keywords: ['Highly Detailed', 'Photorealistic Render', 'Fine Details', 'Crisp'], imageUrl: 'c6/7.jpg' },
            { name: 'Emotional Depth Focus', keywords: ['Dramatic', 'Moody', 'Expressive Colors', 'Soft Focus', 'Immersive'], imageUrl: 'c6/8.jpg' }
        ]
    },
     {
        id: 'preset-composition-perspective', // NEW preset category for composition
        header: 'Composition & Perspective',
        description: 'Common framing and shot types for human subjects and portraits.',
        targetCategory: 'composition-perspective',
        options: [
            { name: 'Classic Portrait Shot', keywords: ['Portrait', 'Close-up', 'Shallow Depth of Field', 'Centered', 'Eye-level'], imageUrl: 'c7/1.jpg' },
            { name: 'Full Body Dynamic Shot', keywords: ['Full Shot', 'Dynamic Composition', 'Low Angle', 'Wide Angle'], imageUrl: 'c7/2.jpg' },
            { name: 'Environmental Portrait', keywords: ['Medium Shot', 'Landscape', 'Deep Depth of Field', 'Rule of Thirds'], imageUrl: 'c7/3.jpg' },
            { name: 'Dramatic Close-up', keywords: ['Close-up', 'Macro Shot', 'Sharp Focus', 'Dramatic'], imageUrl: 'c7/4.jpg' },
            { name: 'Overhead Group Shot', keywords: ['Overhead (Top-down)', 'Group Shot', 'Wide Angle'], imageUrl: 'c7/5.jpg' },
            { name: 'Profile View', keywords: ['Side Lighting', 'Sharp Focus', 'Close-up'], imageUrl: 'c7/6.jpg' },
            { name: 'Candid Street Shot', keywords: ['Wide Shot', 'Motion Blur', 'Off-center', 'Busy'], imageUrl: 'c7/7.jpg' }
        ]
    }
];
