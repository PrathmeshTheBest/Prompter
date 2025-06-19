// script.js

import { categoriesData, presetsCategoriesData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const categoriesSectionsContainer = document.getElementById('categories-sections-container');
    const presetCategoriesSectionsContainer = document.getElementById('preset-categories-sections-container');
    const formatCategoriesSectionsContainer = document.getElementById('format-categories-sections-container');

    const subjectInputManual = document.getElementById('subject-input');
    const subjectInputPresets = document.getElementById('subject-input-presets');
    const subjectInputFormat = document.getElementById('subject-input-format');

    const finalPromptOutputManual = document.getElementById('final-prompt-manual');
    const copyPromptBtnManual = document.getElementById('copy-prompt-btn-manual');
    const resetBtnManual = document.getElementById('reset-btn-manual');

    const finalPromptOutputPresets = document.getElementById('final-prompt-presets');
    const copyPromptBtnPresets = document.getElementById('copy-prompt-btn-presets');
    const resetBtnPresets = document.getElementById('reset-btn-presets');

    const finalPromptOutputFormat = document.getElementById('final-prompt-format');
    const copyPromptBtnFormat = document.getElementById('copy-prompt-btn-format');
    const resetBtnFormat = document.getElementById('reset-btn-format');

    // Generate Page elements (Removed from HTML, keeping these for reference in case they were used elsewhere not evident from snippet)
    // const generatePage = document.getElementById('generate-page'); // No longer exists in HTML
    // const finalPromptOutputGenerate = document.getElementById('final-prompt-generate'); // No longer exists in HTML
    // const copyPromptBtnGenerate = document.getElementById('copy-prompt-btn-generate'); // No longer exists in HTML

    // API Selection and Key Input (No longer exists in HTML)
    // const apiProviderToggleGroup = document.getElementById('api-provider-toggle-group');
    // const apiProviderSliderIndicator = document.getElementById('api-provider-slider-indicator');
    // const apiProviderButtons = apiProviderToggleGroup ? apiProviderToggleGroup.querySelectorAll('.toggle-button') : [];

    // const openaiModelSelection = document.getElementById('openai-model-selection');
    // const googleImageModelSelection = document.getElementById('google-image-model-selection');
    // const openaiModelToggleGroup = document.getElementById('openai-model-toggle-group');
    // const openaiModelSliderIndicator = document.getElementById('openai-model-slider-indicator');
    // const openaiModelButtons = openaiModelToggleGroup ? openaiModelToggleGroup.querySelectorAll('.toggle-button') : [];

    // const googleImageModelToggleGroup = document.getElementById('google-image-model-toggle-group');
    // const googleImageModelSliderIndicator = document.getElementById('google-image-model-slider-indicator');
    // const googleImageModelButtons = googleImageModelToggleGroup ? googleImageModelToggleGroup.querySelectorAll('.toggle-button') : [];

    // const openaiApiKeyInput = document.getElementById('openai-api-key');
    // const googleImageApiKeyInput = document.getElementById('google-image-api-key');
    // const clearApiButtons = document.querySelectorAll('.action-button.clear-btn'); // Still exists in HTML but for other inputs now

    // const generateImageBtn = document.getElementById('generate-image-btn'); // No longer exists in HTML
    // const imageDisplayArea = document.getElementById('image-display-area'); // No longer exists in HTML
    // const loadingIndicator = document.getElementById('loading-indicator'); // No longer exists in HTML


    const messageBox = document.getElementById('message-box');

    const pageToggleGroup = document.getElementById('page-toggle-group');
    const toggleButtons = document.querySelectorAll('.toggle-button');
    const sliderIndicator = document.getElementById('slider-indicator');

    const manualPage = document.getElementById('manual-page');
    const presetsPage = document.getElementById('presets-page');
    const formatPage = document.getElementById('format-page');

    const selectedPresetKeywordsDisplay = document.getElementById('selected-preset-keywords-display');
    const currentPresetKeywordsText = document.getElementById('current-preset-keywords');

    // Manual Page Custom Keywords elements
    const customKeywordsInput = document.getElementById('custom-keywords-input');
    const addCustomKeywordsBtn = document.getElementById('add-custom-keywords-btn');
    const clearCustomKeywordsBtn = document.getElementById('clear-custom-keywords-btn');
    const customKeywordsDisplayArea = document.getElementById('custom-keywords-display-area');

    // Presets Page Custom Presets elements
    const customPresetNameInput = document.getElementById('custom-preset-name-input');
    const customPresetKeywordsInput = document.getElementById('custom-preset-keywords-input');
    const addUserPresetBtn = document.getElementById('add-user-preset-btn');
    const clearAllUserPresetsBtn = document.getElementById('clear-all-user-presets-btn');
    const userPresetsDisplayArea = document.getElementById('user-presets-display-area');


    const selectedOptions = {}; // Global state for selected options by category ID
    const activePresets = {}; // Stores { 'preset-category-id': 'selected-preset-name' } (for predefined presets)
    let customKeywordsSet = new Set(); // To store user-added keywords (Manual tab, also affected by custom presets)
    let customUserPresets = []; // To store user-defined preset objects {name: string, keywords: string[]}

    // Removed API related state variables as generate tab is removed
    // let currentApiProvider = 'openai'; // Default selected provider
    // let currentOpenAIModel = 'dall-e-3'; // Default OpenAI model
    // let currentGoogleImageModel = 'imagen-3.0-generate-002'; // Default Google Imagen model


    // Initialize selectedOptions with empty Sets for all manual categories
    categoriesData.forEach(cat => {
        selectedOptions[cat.id] = new Set();
    });
    // Initialize custom-keywords category for selectedOptions (for Manual tab custom keywords & Custom Presets)
    selectedOptions['custom-keywords'] = new Set();


    const showMessage = (msg, type = 'info') => {
        messageBox.textContent = msg;
        messageBox.classList.remove('hidden');
        if (type === 'error') {
            messageBox.classList.remove('bg-blue-600');
            messageBox.classList.add('bg-red-600');
        } else {
            messageBox.classList.remove('bg-red-600');
            messageBox.classList.add('bg-blue-600');
        }
        setTimeout(() => {
            messageBox.classList.add('hidden');
        }, 3000);
    };

    const updateSliderIndicator = (container, indicator, activeButton) => {
        if (activeButton && indicator) {
            indicator.style.left = `${activeButton.offsetLeft}px`;
            indicator.style.width = `${activeButton.offsetWidth}px`;
        }
    };

    const showPage = (pageId) => {
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.add('hidden');
        });
        toggleButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        let activeButton;
        if (pageId === 'manual') {
            manualPage.classList.remove('hidden');
            activeButton = document.querySelector('.toggle-button[data-page="manual"]');
            // Sync subject input from others to manual (master)
            subjectInputManual.value = subjectInputPresets.value || subjectInputFormat.value || subjectInputManual.value;
            renderCustomKeywords(); // Render custom keywords when manual page is shown
        } else if (pageId === 'presets') {
            presetsPage.classList.remove('hidden');
            activeButton = document.querySelector('.toggle-button[data-page="presets"]');
            subjectInputPresets.value = subjectInputManual.value; // Sync from master
            renderUserPresets(); // Render user-defined presets when presets page is shown
        } else if (pageId === 'format') {
            formatPage.classList.remove('hidden');
            activeButton = document.querySelector('.toggle-button[data-page="format"]');
            subjectInputFormat.value = subjectInputManual.value; // Sync from master
            renderFormatPageInputs(); // Render inputs when switching to format page
        }
        // Removed 'generate' page handling

        if (activeButton) {
            activeButton.classList.add('active');
            requestAnimationFrame(() => {
                updateSliderIndicator(pageToggleGroup, sliderIndicator, activeButton);
            });
        }
        updateFinalPrompt(); // Update prompt after page switch
    };

    // Universal toggle function for manual options
    const toggleManualOption = (categoryId, optionText, isChecked, optionItem, customCheckboxVisual) => {
        if (!selectedOptions[categoryId]) {
            selectedOptions[categoryId] = new Set();
        }

        if (isChecked) {
            selectedOptions[categoryId].add(optionText);
            // If a manual option is selected, deselect any active predefined preset in that category
            const presetCategory = presetsCategoriesData.find(pc => pc.targetCategory === categoryId);
            if (presetCategory && activePresets[presetCategory.id]) {
                // Visually deselect the active preset button in that row
                const prevPresetButton = document.querySelector(`#preset-category-${presetCategory.id} .preset-option-card[data-preset-name="${activePresets[presetCategory.id]}"]`);
                if (prevPresetButton) {
                    prevPresetButton.classList.remove('selected');
                }
                delete activePresets[presetCategory.id]; // Remove active preset tracking
                updateSelectedPresetKeywordsDisplay(); // Clear display if preset deselected indirectly
            }
            optionItem.classList.add('selected');
            customCheckboxVisual.querySelector('svg').classList.remove('hidden');
        } else {
            selectedOptions[categoryId].delete(optionText);
            optionItem.classList.remove('selected');
            customCheckboxVisual.querySelector('svg').classList.add('hidden');
        }
        updateFinalPrompt();
    };

    const renderManualCategoriesWithOptions = () => {
        categoriesSectionsContainer.innerHTML = '';

        categoriesData.forEach(category => {
            const categorySection = document.createElement('div');
            categorySection.id = `category-${category.id}`;
            categorySection.className = 'glass-element p-6 rounded-lg w-full';

            const categoryHeader = document.createElement('h2');
            categoryHeader.className = 'text-white text-2xl font-bold mb-4 text-center';
            categoryHeader.style.fontFamily = 'var(--font-heading)';
            categoryHeader.textContent = category.header;
            categorySection.appendChild(categoryHeader);

            if (category.description) {
                const categoryDescription = document.createElement('p');
                categoryDescription.className = 'text-white text-md opacity-80 text-center mb-6';
                categoryDescription.textContent = category.description.split('(')[0].trim(); // Only show main description
                categorySection.appendChild(categoryDescription);
            }

            const optionsGrid = document.createElement('div');
            optionsGrid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 custom-scroll overflow-y-auto max-h-96 p-2';

            if (!selectedOptions[category.id]) {
                selectedOptions[category.id] = new Set();
            }

            const addOptionToGrid = (optionText, targetGrid, categoryIdForId) => {
                const optionItem = document.createElement('div');
                optionItem.className = 'option-item p-3 rounded-md cursor-pointer text-white';

                optionItem.innerHTML = `
                    <label class="w-full h-full flex items-center justify-start gap-2">
                        <input type="checkbox" id="${categoryIdForId}-${optionText.replace(/\s+/g, '-')}" data-option="${optionText}" class="sr-only">
                        <span class="custom-checkbox-visual">
                            <svg class="w-3 h-3 text-white hidden" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </span>
                        <span>${optionText}</span>
                    </label>
                `;

                const customCheckbox = optionItem.querySelector('input[type="checkbox"]');
                const customCheckboxVisual = optionItem.querySelector('.custom-checkbox-visual');

                // Check selection based on the correct selectedOptions set
                if (selectedOptions[categoryIdForId].has(optionText)) {
                    optionItem.classList.add('selected');
                    customCheckbox.checked = true;
                    customCheckboxVisual.querySelector('svg').classList.remove('hidden');
                }

                optionItem.addEventListener('click', () => {
                    customCheckbox.checked = !customCheckbox.checked;
                    toggleManualOption(categoryIdForId, optionText, customCheckbox.checked, optionItem, customCheckboxVisual);
                });

                targetGrid.appendChild(optionItem);
            };

            if (Array.isArray(category.options)) {
                category.options.forEach(optionText => {
                    addOptionToGrid(optionText, optionsGrid, category.id);
                });
            } else {
                for (const subHeader in category.options) {
                    const subHeaderElement = document.createElement('h4');
                    subHeaderElement.className = 'text-white text-lg font-semibold col-span-full mt-4 first:mt-0 pt-2 pb-1 border-b border-gray-700/50';
                    subHeaderElement.textContent = subHeader;
                    optionsGrid.appendChild(subHeaderElement);

                    category.options[subHeader].forEach(optionText => {
                        addOptionToGrid(optionText, optionsGrid, category.id);
                    });
                }
            }
            categorySection.appendChild(optionsGrid);
            categoriesSectionsContainer.appendChild(categorySection);
        });
    };

    // Function to update the selected preset keywords display
    const updateSelectedPresetKeywordsDisplay = (keywords = []) => {
        if (keywords.length > 0) {
            currentPresetKeywordsText.textContent = keywords.join(', ');
            selectedPresetKeywordsDisplay.classList.remove('hidden');
            // Force reflow for animation
            void selectedPresetKeywordsDisplay.offsetWidth;
            selectedPresetKeywordsDisplay.style.opacity = '1';
            selectedPresetKeywordsDisplay.style.transform = 'translateY(0)';
        } else {
            // Animate out before hiding
            selectedPresetKeywordsDisplay.style.opacity = '0';
            selectedPresetKeywordsDisplay.style.transform = 'translateY(20px)';
            // Hide after transition
            selectedPresetKeywordsDisplay.addEventListener('transitionend', function handler() {
                selectedPresetKeywordsDisplay.classList.add('hidden');
                currentPresetKeywordsText.textContent = ''; // Clear content only after hidden
                selectedPresetKeywordsDisplay.removeEventListener('transitionend', handler);
            }, { once: true }); // Use { once: true } to ensure the listener is removed after first use
        }
    };

    // Function to apply a predefined preset
    const applyPreset = (presetCategory, presetName, keywords, clickedPresetCard) => {
        // Deselect all other presets in the same preset category (visual only)
        document.querySelectorAll(`#preset-category-${presetCategory.id} .preset-option-card`).forEach(card => {
            card.classList.remove('selected');
        });
        // Also deselect any custom user presets if a predefined one is selected
        document.querySelectorAll('#user-presets-display-area .preset-option-card').forEach(card => {
            card.classList.remove('selected');
        });


        // Clear previously selected options in the TARGET MANUAL CATEGORY
        if (!selectedOptions[presetCategory.targetCategory]) {
            selectedOptions[presetCategory.targetCategory] = new Set();
        }

        // Get all possible options for the target manual category
        const targetManualCategory = categoriesData.find(cat => cat.id === presetCategory.targetCategory);
        if (targetManualCategory) {
            let allOptionsInTargetCategory = [];
            if (Array.isArray(targetManualCategory.options)) {
                allOptionsInTargetCategory = targetManualCategory.options;
            } else {
                for (const subHeader in targetManualCategory.options) {
                    allOptionsInTargetCategory.push(...targetManualCategory.options[subHeader]);
                }
            }

            // Visually uncheck all manual options belonging to this category
            allOptionsInTargetCategory.forEach(optionText => {
                const manualInput = document.getElementById(`${presetCategory.targetCategory}-${optionText.replace(/\s+/g, '-')}`);
                if (manualInput) {
                    const optionItem = manualInput.closest('.option-item');
                    const customCheckboxVisual = optionItem.querySelector('.custom-checkbox-visual');
                    manualInput.checked = false;
                    optionItem.classList.remove('selected');
                    customCheckboxVisual.querySelector('svg')?.classList.add('hidden');
                }
            });
        }
        selectedOptions[presetCategory.targetCategory].clear(); // Clear the data model

        // Add new preset's keywords to selectedOptions and visually select them in Manual mode
        keywords.forEach(keyword => {
            selectedOptions[presetCategory.targetCategory].add(keyword);
            const manualInput = document.getElementById(`${presetCategory.targetCategory}-${keyword.replace(/\s+/g, '-')}`);
            if (manualInput) {
                const optionItem = manualInput.closest('.option-item');
                const customCheckboxVisual = optionItem.querySelector('.custom-checkbox-visual');
                manualInput.checked = true;
                optionItem.classList.add('selected');
                customCheckboxVisual.querySelector('svg').classList.remove('hidden');
            }
        });

        // Set the current preset as active (visual only for the preset card itself)
        const selectedPresetCard = document.querySelector(`#preset-category-${presetCategory.id} .preset-option-card[data-preset-name="${presetName}"]`);
        if (selectedPresetCard) {
            selectedPresetCard.classList.add('selected');
        }

        // Store active preset for this preset category
        activePresets[presetCategory.id] = presetName;

        // Dynamically insert the selectedPresetKeywordsDisplay after the clicked preset's category section
        const clickedCategorySection = clickedPresetCard.closest('.glass-element');
        if (clickedCategorySection) {
            clickedCategorySection.after(selectedPresetKeywordsDisplay);
        }


        // Update the dedicated keyword display area
        updateSelectedPresetKeywordsDisplay(keywords);

        updateFinalPrompt();
        renderFormatPageInputs(); // Update format page inputs when a preset is applied
    };

    // Function to render preset categories for PRESETS mode
    const renderPresetsCategories = () => {
        presetCategoriesSectionsContainer.innerHTML = '';

        presetsCategoriesData.forEach(presetCategory => {
            const categorySection = document.createElement('div');
            categorySection.id = `preset-category-${presetCategory.id}`;
            categorySection.className = 'glass-element p-6 rounded-lg w-full';

            const categoryHeader = document.createElement('h2');
            categoryHeader.className = 'text-white text-2xl font-bold mb-4 text-center';
            categoryHeader.style.fontFamily = 'var(--font-heading)';
            categoryHeader.textContent = presetCategory.header;
            categorySection.appendChild(categoryHeader);

            if (presetCategory.description) {
                const categoryDescription = document.createElement('p');
                categoryDescription.className = 'text-white text-md opacity-80 text-center mb-6';
                categoryDescription.textContent = presetCategory.description;
                categorySection.appendChild(categoryDescription);
            }

            // Create the horizontal strip container for preset cards
            const optionsStrip = document.createElement('div');
            optionsStrip.className = 'preset-section-strip custom-scroll';

            presetCategory.options.forEach(preset => {
                const presetCard = document.createElement('button'); // Use button for accessibility and click handling
                presetCard.className = 'preset-option-card';
                presetCard.setAttribute('type', 'button'); // Explicitly set type to button

                // Generate a placeholder image URL based on preset name
                const imageText = preset.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                // Changed image dimensions to match new rectangular card size
                const imageUrl = `https://placehold.co/250x150/3B82F6/ffffff?text=${imageText}`;

                // Set background image directly via style attribute
                presetCard.style.backgroundImage = `url('${imageUrl}')`;

                presetCard.innerHTML = `
                    <span class="preset-name-overlay">${preset.name}</span>
                `;

                // Check if this preset is currently active for its category
                if (activePresets[presetCategory.id] === preset.name) {
                    presetCard.classList.add('selected');
                }

                presetCard.dataset.presetName = preset.name; // Store preset name for identification

                presetCard.addEventListener('click', (event) => {
                    applyPreset(presetCategory, preset.name, preset.keywords, event.currentTarget); // Pass the clicked card
                    // Optional: Scroll to center the selected button
                    presetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                });
                optionsStrip.appendChild(presetCard);
            });
            categorySection.appendChild(optionsStrip);
            presetCategoriesSectionsContainer.appendChild(categorySection);
        });
    };


    // NEW: Render function for Format Page inputs
    const renderFormatPageInputs = () => {
        formatCategoriesSectionsContainer.innerHTML = ''; // Clear previous content

        // Iterate through categoriesData to create input fields
        categoriesData.forEach(category => {
            const categorySection = document.createElement('div');
            categorySection.className = 'glass-element p-6 rounded-lg w-full';

            const categoryHeader = document.createElement('h2');
            categoryHeader.className = 'text-white text-2xl font-bold mb-4 text-center';
            categoryHeader.style.fontFamily = 'var(--font-heading)';
            categorySection.appendChild(categoryHeader);

            const categoryDescription = document.createElement('p');
            categoryDescription.className = 'text-white text-md opacity-80 text-center mb-4';
            categoryDescription.textContent = category.description; // Full description with guidance
            categorySection.appendChild(categoryDescription);

            const textarea = document.createElement('textarea');
            textarea.id = `format-input-${category.id}`;
            textarea.className = 'w-full p-3 rounded-md bg-transparent text-white border border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-400 custom-scroll';
            textarea.rows = 3;
            textarea.placeholder = `Enter comma-separated keywords for ${category.header.toLowerCase()}`;
            textarea.dataset.categoryId = category.id; // Store category ID for easy access

            // Populate textarea with current selected options for this category
            if (selectedOptions[category.id] && selectedOptions[category.id].size > 0) {
                textarea.value = Array.from(selectedOptions[category.id]).join(', ');
            } else {
                textarea.value = '';
            }

            // Add event listener for input changes
            textarea.addEventListener('input', (event) => {
                parseFormatInputAndUpdatePrompt(event);
            });

            categorySection.appendChild(textarea);
            formatCategoriesSectionsContainer.appendChild(categorySection);
        });
    };

    // NEW: Function to parse input from Format tab and update selectedOptions
    const parseFormatInputAndUpdatePrompt = (event) => {
        const categoryId = event.target.dataset.categoryId;
        const inputValue = event.target.value.trim();

        if (!selectedOptions[categoryId]) {
            selectedOptions[categoryId] = new Set();
        }

        // Clear previous selections for this category
        selectedOptions[categoryId].clear();

        if (inputValue) {
            inputValue.split(',').forEach(keyword => {
                const trimmedKeyword = keyword.trim();
                if (trimmedKeyword) {
                    selectedOptions[categoryId].add(trimmedKeyword);
                }
            });
        }
        // When modifying via format tab, deselect any active preset in this category
        const presetCategory = presetsCategoriesData.find(pc => pc.targetCategory === categoryId);
        if (presetCategory && activePresets[presetCategory.id]) {
            const prevActivePresetName = activePresets[presetCategory.id];
            const prevPresetCard = document.querySelector(`#preset-category-${presetCategory.id} .preset-option-card[data-preset-name="${prevActivePresetName}"]`);
            if (prevPresetCard) {
                prevPresetCard.classList.remove('selected');
            }
            delete activePresets[presetCategory.id]; // Remove active preset tracking
            updateSelectedPresetKeywordsDisplay(); // Clear display if preset deselected indirectly
        }

        // If the updated category is 'custom-keywords', also save to local storage and re-render the custom keywords section
        // This block is crucial for ensuring changes in custom keywords from Manual/Presets tab are reflected correctly.
        if (categoryId === 'custom-keywords') {
            customKeywordsSet = new Set(selectedOptions['custom-keywords']); // Sync the set
            saveCustomKeywords();
            if (!manualPage.classList.contains('hidden')) { // Only re-render if on the manual page
                renderCustomKeywords();
            }
        }


        // Update manual mode checkboxes visually to reflect changes from format tab
        const targetManualCategory = categoriesData.find(cat => cat.id === categoryId);
        if (targetManualCategory) {
            let allOptionsInTargetCategory = [];
            if (Array.isArray(targetManualCategory.options)) {
                allOptionsInTargetCategory = targetManualCategory.options;
            } else {
                for (const subHeader in targetManualCategory.options) {
                    allOptionsInTargetCategory.push(...targetManualCategory.options[subHeader]);
                }
            }

            allOptionsInTargetCategory.forEach(optionText => {
                const manualInput = document.getElementById(`${categoryId}-${optionText.replace(/\s+/g, '-')}`);
                if (manualInput) {
                    const optionItem = manualInput.closest('.option-item');
                    const customCheckboxVisual = optionItem.querySelector('.custom-checkbox-visual');
                    const isKeywordSelected = selectedOptions[categoryId].has(optionText); // Check if this specific option is now selected

                    if (isKeywordSelected) {
                        manualInput.checked = true;
                        optionItem.classList.add('selected');
                        customCheckboxVisual.querySelector('svg').classList.remove('hidden');
                    } else {
                        manualInput.checked = false;
                        optionItem.classList.remove('selected');
                        customCheckboxVisual.querySelector('svg').classList.add('hidden');
                    }
                }
            });
        }
        updateFinalPrompt();
    };


    // Function to build and update the final prompt string
    const updateFinalPrompt = () => {
        let promptParts = [];
        // Always read the subject from the master input
        const currentSubject = subjectInputManual.value.trim();

        if (currentSubject) {
            promptParts.push(`Generate an image of ${currentSubject}`);
        } else {
            // Clear all outputs if subject is empty
            finalPromptOutputManual.value = '';
            finalPromptOutputPresets.value = '';
            finalPromptOutputFormat.value = '';
            // finalPromptOutputGenerate.value = ''; // Removed generate tab's output
            return;
        }

        // Ensure a consistent order for appending categories to the prompt
        const orderedCategoryIds = categoriesData.map(cat => cat.id);

        orderedCategoryIds.forEach(categoryId => {
            if (selectedOptions[categoryId] && selectedOptions[categoryId].size > 0) {
                const optionsArray = Array.from(selectedOptions[categoryId]);
                if (optionsArray.length > 0) {
                    switch (categoryId) {
                        case 'subject-details':
                            promptParts.push(`${optionsArray.join(', ')}`);
                            break;
                        case 'action-pose-expression':
                            promptParts.push(`${optionsArray.join(', ')}`);
                            break;
                        case 'environment-setting':
                            promptParts.push(`in a ${optionsArray.join(', ')} environment`);
                            break;
                        case 'lighting':
                            promptParts.push(`with ${optionsArray.join(', ')} lighting`);
                            break;
                        case 'style-art-medium':
                            promptParts.push(`in a ${optionsArray.join(', ')} style`);
                            break;
                        case 'composition-perspective':
                            promptParts.push(`${optionsArray.join(', ')} composition`);
                            break;
                        case 'quality-detail':
                            promptParts.push(`${optionsArray.join(', ')} quality`);
                            break;
                    }
                }
            }
        });

        // Add custom keywords (from Manual tab or Custom Presets) to the prompt at the end
        if (selectedOptions['custom-keywords'] && selectedOptions['custom-keywords'].size > 0) {
            promptParts.push(Array.from(selectedOptions['custom-keywords']).join(', '));
        }


        let finalPrompt = promptParts.join(', ');
        finalPrompt = finalPrompt.replace(/,\s*,/g, ', ').replace(/,\s*$/, '').replace(/^\s*,/, '').trim();

        finalPromptOutputManual.value = finalPrompt;
        finalPromptOutputPresets.value = finalPrompt;
        finalPromptOutputFormat.value = finalPrompt;
        // finalPromptOutputGenerate.value = finalPrompt; // Removed generate tab's output
    };

    const copyPrompt = (outputElementId) => {
        const outputElement = document.getElementById(outputElementId);
        if (outputElement.value) {
            try {
                const tempInput = document.createElement('textarea');
                tempInput.value = outputElement.value;
                // Make it invisible but accessible for selection
                tempInput.style.position = 'absolute';
                tempInput.style.left = '-9999px';
                tempInput.style.opacity = '0'; // Ensure it's not visible
                tempInput.style.width = '1px'; // Give it a minimal size
                tempInput.style.height = '1px';
                tempInput.style.border = 'none';
                tempInput.style.padding = '0';
                tempInput.style.margin = '0';
                document.body.appendChild(tempInput);

                tempInput.select();
                // For mobile devices, ensure selection is active
                tempInput.setSelectionRange(0, tempInput.value.length);

                const successful = document.execCommand('copy');
                document.body.removeChild(tempInput); // Clean up

                if (successful) {
                    showMessage('Prompt copied to clipboard!');
                } else {
                    showMessage('Failed to copy prompt: Browser command failed.', 'error');
                }
            } catch (err) {
                console.error('Failed to copy prompt: ', err);
                showMessage('Failed to copy prompt: ' + err.message, 'error');
            }
        } else {
            showMessage('No prompt to copy!', 'error');
        }
    };

    const resetAll = () => {
        subjectInputManual.value = ''; // Clear the master subject input
        subjectInputPresets.value = ''; // Also clear derived inputs
        subjectInputFormat.value = '';

        finalPromptOutputManual.value = '';
        finalPromptOutputPresets.value = '';
        finalPromptOutputFormat.value = ''; // Clear format tab's output
        // finalPromptOutputGenerate.value = ''; // Removed generate tab's output

        // Clear all selected options across all manual categories
        for (const categoryId in selectedOptions) {
            selectedOptions[categoryId].clear();
        }
        // Clear active predefined presets
        for (const presetCatId in activePresets) {
            delete activePresets[presetCatId];
        }
        // Clear custom keywords (manual tab & those from custom presets)
        customKeywordsSet.clear();
        localStorage.removeItem('prompter_custom_keywords');
        selectedOptions['custom-keywords'].clear(); // Ensure this is also cleared

        // Clear custom user presets
        customUserPresets = [];
        localStorage.removeItem('prompter_user_presets');


        // Uncheck all manual mode checkboxes and remove 'selected' class
        document.querySelectorAll('#manual-page .option-item').forEach(el => {
            const checkbox = el.querySelector('input[type="checkbox"]');
            const customCheckboxVisual = el.querySelector('.custom-checkbox-visual');
            if (checkbox) {
                checkbox.checked = false;
            }
            if (customCheckboxVisual) {
                 customCheckboxVisual.querySelector('svg')?.classList.add('hidden');
            }
            el.classList.remove('selected');
        });

        // Deselect all preset mode items (predefined and custom)
        document.querySelectorAll('#presets-page .preset-option-card').forEach(el => {
            el.classList.remove('selected');
        });

        // Clear all format tab textareas
        document.querySelectorAll('#format-page textarea[data-category-id]').forEach(textarea => {
            textarea.value = '';
        });

        updateSelectedPresetKeywordsDisplay([]); // Clear the keyword display area with animation
        renderCustomKeywords(); // Re-render manual tab custom keywords display after reset
        renderUserPresets(); // Re-render presets tab user presets display after reset

        showMessage('All selections reset.');
        updateFinalPrompt(); // Update prompt after reset
    };

    // Manual Page Custom Keywords Functions
    const loadCustomKeywords = () => {
        const storedKeywords = localStorage.getItem('prompter_custom_keywords');
        if (storedKeywords) {
            customKeywordsSet = new Set(JSON.parse(storedKeywords));
        } else {
            customKeywordsSet = new Set();
        }
        // Also update the selected options set for custom keywords based on loaded data
        selectedOptions['custom-keywords'] = new Set(customKeywordsSet);
    };

    const saveCustomKeywords = () => {
        localStorage.setItem('prompter_custom_keywords', JSON.stringify(Array.from(customKeywordsSet)));
    };

    const renderCustomKeywords = () => {
        customKeywordsDisplayArea.innerHTML = ''; // Clear existing displayed keywords

        customKeywordsSet.forEach(keyword => {
            const optionItem = document.createElement('div');
            optionItem.className = 'option-item p-3 rounded-md cursor-pointer text-white';

            optionItem.innerHTML = `
                <label class="w-full h-full flex items-center justify-start gap-2">
                    <input type="checkbox" id="custom-keywords-${keyword.replace(/\s+/g, '-')}" data-option="${keyword}" class="sr-only">
                    <span class="custom-checkbox-visual">
                        <svg class="w-3 h-3 text-white hidden" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                    </span>
                    <span>${keyword}</span>
                </label>
            `;

            const customCheckbox = optionItem.querySelector('input[type="checkbox"]');
            const customCheckboxVisual = optionItem.querySelector('.custom-checkbox-visual');

            // Set initial state based on selectedOptions['custom-keywords']
            if (selectedOptions['custom-keywords'].has(keyword)) {
                optionItem.classList.add('selected');
                customCheckbox.checked = true;
                customCheckboxVisual.querySelector('svg').classList.remove('hidden');
            }

            optionItem.addEventListener('click', () => {
                customCheckbox.checked = !customCheckbox.checked;
                if (customCheckbox.checked) {
                    selectedOptions['custom-keywords'].add(keyword);
                    optionItem.classList.add('selected');
                    customCheckboxVisual.querySelector('svg').classList.remove('hidden');
                } else {
                    selectedOptions['custom-keywords'].delete(keyword);
                    optionItem.classList.remove('selected');
                    customCheckboxVisual.querySelector('svg').classList.add('hidden');
                }
                updateFinalPrompt();
            });

            customKeywordsDisplayArea.appendChild(optionItem);
        });
    };

    addCustomKeywordsBtn.addEventListener('click', () => {
        const inputText = customKeywordsInput.value.trim();
        if (inputText) {
            const newKeywords = inputText.split(',').map(k => k.trim()).filter(k => k !== '');
            newKeywords.forEach(keyword => {
                customKeywordsSet.add(keyword);
                selectedOptions['custom-keywords'].add(keyword); // Also add to selected for immediate prompt update
            });
            saveCustomKeywords();
            renderCustomKeywords();
            customKeywordsInput.value = ''; // Clear input field
            updateFinalPrompt(); // Update prompt after adding new keywords
        } else {
            showMessage('Please enter keywords to add.', 'error');
        }
    });

    clearCustomKeywordsBtn.addEventListener('click', () => {
        customKeywordsSet.clear();
        selectedOptions['custom-keywords'].clear(); // Clear selected custom keywords too
        saveCustomKeywords();
        renderCustomKeywords();
        updateFinalPrompt(); // Update prompt after clearing custom keywords
        showMessage('All custom keywords cleared.');
    });


    // Presets Page Custom Presets Functions
    const loadUserPresets = () => {
        const storedUserPresets = localStorage.getItem('prompter_user_presets');
        if (storedUserPresets) {
            customUserPresets = JSON.parse(storedUserPresets);
        } else {
            customUserPresets = [];
        }
    };

    const saveUserPresets = () => {
        localStorage.setItem('prompter_user_presets', JSON.stringify(customUserPresets));
    };

    const renderUserPresets = () => {
        userPresetsDisplayArea.innerHTML = ''; // Clear existing displayed presets

        customUserPresets.forEach(preset => {
            const presetCard = document.createElement('button');
            presetCard.className = 'preset-option-card';
            presetCard.setAttribute('type', 'button');

            const imageText = preset.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            const imageUrl = `https://placehold.co/250x150/60A5FA/ffffff?text=${imageText}`; // Different color for custom

            presetCard.style.backgroundImage = `url('${imageUrl}')`;

            presetCard.innerHTML = `
                <span class="preset-name-overlay">${preset.name}</span>
            `;

            presetCard.dataset.presetName = preset.name; // Store for identification

            // Determine if this custom preset is currently "active" by checking if all its keywords are in selectedOptions['custom-keywords']
            const isActive = preset.keywords.every(kw => selectedOptions['custom-keywords'].has(kw));
            if (isActive && preset.keywords.length > 0) { // Only mark active if it has keywords and they are all selected
                presetCard.classList.add('selected');
            }


            presetCard.addEventListener('click', (event) => {
                // Deselect all predefined active presets first (visual only)
                document.querySelectorAll('#preset-categories-sections-container .preset-option-card.selected').forEach(card => {
                    card.classList.remove('selected');
                });
                // Clear activePresets tracker
                for (const key in activePresets) {
                    delete activePresets[key];
                }


                // Toggle selection of this custom preset
                const isCurrentlySelected = presetCard.classList.contains('selected');

                if (isCurrentlySelected) {
                    // Deselect: remove all its keywords from selectedOptions['custom-keywords']
                    preset.keywords.forEach(keyword => {
                        selectedOptions['custom-keywords'].delete(keyword);
                        customKeywordsSet.delete(keyword); // Also remove from manual tab's set
                    });
                    presetCard.classList.remove('selected');
                    updateSelectedPresetKeywordsDisplay([]); // Clear displayed keywords
                } else {
                    // Deselect any other active custom user preset in this area
                    document.querySelectorAll('#user-presets-display-area .preset-option-card.selected').forEach(card => {
                        card.classList.remove('selected');
                    });
                    // Select: add all its keywords to selectedOptions['custom-keywords']
                    preset.keywords.forEach(keyword => {
                        selectedOptions['custom-keywords'].add(keyword);
                        customKeywordsSet.add(keyword); // Also add to manual tab's set
                    });
                    presetCard.classList.add('selected');
                    updateSelectedPresetKeywordsDisplay(preset.keywords); // Display its keywords
                }

                saveCustomKeywords(); // Save the updated custom keywords set
                renderCustomKeywords(); // Update manual page's custom keywords display
                updateFinalPrompt(); // Update the overall prompt
                presetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            });
            userPresetsDisplayArea.appendChild(presetCard);
        });
    };

    addUserPresetBtn.addEventListener('click', () => {
        const name = customPresetNameInput.value.trim();
        const keywordsText = customPresetKeywordsInput.value.trim();

        if (!name) {
            showMessage('Please enter a preset name.', 'error');
            return;
        }
        if (!keywordsText) {
            showMessage('Please enter keywords for the preset.', 'error');
            return;
        }

        const keywords = keywordsText.split(',').map(k => k.trim()).filter(k => k !== '');

        if (keywords.length === 0) {
            showMessage('Keywords cannot be empty after parsing. Please enter valid comma-separated keywords.', 'error');
            return;
        }

        // Check for duplicate name
        if (customUserPresets.some(p => p.name.toLowerCase() === name.toLowerCase())) {
            showMessage(`A preset named "${name}" already exists.`, 'error');
            return;
        }

        customUserPresets.push({ name, keywords });
        saveUserPresets();
        renderUserPresets();
        customPresetNameInput.value = '';
        customPresetKeywordsInput.value = '';
        showMessage(`Preset "${name}" added successfully!`);
    });

    clearAllUserPresetsBtn.addEventListener('click', () => {
        customUserPresets = [];
        localStorage.removeItem('prompter_user_presets');
        // Also clear any of these keywords that might be in the 'selectedOptions['custom-keywords']' if they are only from custom presets
        // For simplicity, reset the main custom keywords if clearing all custom presets.
        customKeywordsSet.clear();
        selectedOptions['custom-keywords'].clear();
        saveCustomKeywords(); // Save empty custom keywords

        renderUserPresets();
        renderCustomKeywords(); // Update manual page display
        updateFinalPrompt();
        showMessage('All custom presets cleared.');
    });

    // Attach event listeners for each page's buttons
    copyPromptBtnManual.addEventListener('click', () => copyPrompt('final-prompt-manual'));
    resetBtnManual.addEventListener('click', resetAll);

    copyPromptBtnPresets.addEventListener('click', () => copyPrompt('final-prompt-presets'));
    resetBtnPresets.addEventListener('click', resetAll);

    copyPromptBtnFormat.addEventListener('click', () => copyPrompt('final-prompt-format'));
    resetBtnFormat.addEventListener('click', resetAll);

    // Removed Generate tab buttons
    // copyPromptBtnGenerate.addEventListener('click', () => copyPrompt('final-prompt-generate'));
    // generateImageBtn.addEventListener('click', generateImage);


    // Event Listeners for Page Toggles
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            showPage(button.dataset.page);
        });
    });

    // Add horizontal scroll on wheel for preset-section-strip elements
    document.querySelectorAll('.preset-section-strip').forEach(element => {
        element.addEventListener('wheel', (event) => {
            // Check if the Ctrl key is pressed (to allow zooming, default browser behavior)
            if (event.ctrlKey) {
                return;
            }
            event.preventDefault(); // Prevent vertical scrolling
            element.scrollLeft += event.deltaY; // Scroll horizontally based on vertical wheel movement
        });
    });


    // API Key Management Functions (Removed as Generate tab is removed)
    // const saveApiKey = (provider, key) => {
    //     localStorage.setItem(`prompter_${provider}_api_key`, key);
    // };

    // const loadApiKey = (provider) => {
    //     return localStorage.getItem(`prompter_${provider}_api_key`) || '';
    // };

    // Event listeners for API key inputs (save on input for continuous saving)
    // if (openaiApiKeyInput) openaiApiKeyInput.addEventListener('input', () => {
    //     saveApiKey('openai', openaiApiKeyInput.value.trim());
    // });
    // if (googleImageApiKeyInput) googleImageApiKeyInput.addEventListener('input', () => {
    //     saveApiKey('google-image', googleImageApiKeyInput.value.trim());
    // });

    // Populate API keys on load
    // if (openaiApiKeyInput) openaiApiKeyInput.value = loadApiKey('openai');
    // if (googleImageApiKeyInput) googleImageApiKeyInput.value = loadApiKey('google-image');

    // Clear API key buttons
    // clearApiButtons.forEach(button => {
    //     button.addEventListener('click', (event) => {
    //         const provider = event.target.dataset.api;
    //         localStorage.removeItem(`prompter_${provider}_api_key`);
    //         if (provider === 'openai') {
    //             if (openaiApiKeyInput) openaiApiKeyInput.value = '';
    //         } else if (provider === 'google-image') {
    //             if (googleImageApiKeyInput) googleImageApiKeyInput.value = '';
    //         }
    //         showMessage(`${provider.charAt(0).toUpperCase() + provider.slice(1)} API key cleared.`);
    //     });
    // });


    // API Provider and Model Selection Logic (Removed as Generate tab is removed)
    // function showModelSelection() {
    //     if (currentApiProvider === 'openai') {
    //         if (openaiModelSelection) openaiModelSelection.classList.remove('hidden');
    //         if (googleImageModelSelection) googleImageModelSelection.classList.add('hidden');
    //         const activeOpenAIModelBtn = openaiModelToggleGroup ? openaiModelToggleGroup.querySelector(`[data-model="${currentOpenAIModel}"]`) : null;
    //         if (activeOpenAIModelBtn) {
    //             updateSliderIndicator(openaiModelToggleGroup, openaiModelSliderIndicator, activeOpenAIModelBtn);
    //         }
    //     } else if (currentApiProvider === 'google-image') {
    //         if (googleImageModelSelection) googleImageModelSelection.classList.remove('hidden');
    //         if (openaiModelSelection) openaiModelSelection.classList.add('hidden');
    //         const activeGoogleModelBtn = googleImageModelToggleGroup ? googleImageModelToggleGroup.querySelector(`[data-model="${currentGoogleImageModel}"]`) : null;
    //         if (activeGoogleModelBtn) {
    //             updateSliderIndicator(googleImageModelToggleGroup, googleImageModelSliderIndicator, activeGoogleModelBtn);
    //         }
    //     }
    // }

    // Event listeners for API Provider buttons (Removed)
    // if (apiProviderButtons) apiProviderButtons.forEach(button => {
    //     button.addEventListener('click', (event) => {
    //         updateApiProviderSelection(event.currentTarget.dataset.provider);
    //     });
    // });

    // Function to handle API provider button clicks and update state/UI (Removed)
    // const updateApiProviderSelection = (provider) => {
    //     currentApiProvider = provider;
    //     if (apiProviderButtons) apiProviderButtons.forEach(btn => {
    //         if (btn.dataset.provider === provider) {
    //             btn.classList.add('active');
    //             updateSliderIndicator(apiProviderToggleGroup, apiProviderSliderIndicator, btn);
    //         } else {
    //             btn.classList.remove('active');
    //         }
    //     });
    //     showModelSelection();
    // };

    // Event listeners for OpenAI Model buttons (Removed)
    // if (openaiModelButtons) openaiModelButtons.forEach(button => {
    //     button.addEventListener('click', (event) => {
    //         openaiModelButtons.forEach(btn => btn.classList.remove('active'));
    //         event.currentTarget.classList.add('active');
    //         currentOpenAIModel = event.currentTarget.dataset.model;
    //         updateSliderIndicator(openaiModelToggleGroup, openaiModelSliderIndicator, event.currentTarget);
    //     });
    // });

    // Event listeners for Google Imagen Model buttons (Removed)
    // if (googleImageModelButtons) googleImageModelButtons.forEach(button => {
    //     button.addEventListener('click', (event) => {
    //         googleImageModelButtons.forEach(btn => btn.classList.remove('active'));
    //         event.currentTarget.classList.add('active');
    //         currentGoogleImageModel = event.currentTarget.dataset.model;
    //         updateSliderIndicator(googleImageModelToggleGroup, googleImageModelSliderIndicator, event.currentTarget);
    //     });
    // });


    // Function to generate image (Removed as Generate tab is removed)
    // async function generateImage() {
    //     const prompt = finalPromptOutputGenerate.value.trim();
    //     if (!prompt) {
    //         showMessage('Please create a prompt first!', 'error');
    //         return;
    //     }

    //     let apiKey = '';
    //     let apiUrl = '';
    //     let payload = {};
    //     let headers = { 'Content-Type': 'application/json' };
    //     let model = '';

    //     if (currentApiProvider === 'openai') {
    //         apiKey = openaiApiKeyInput.value.trim();
    //         if (!apiKey) {
    //             showMessage('Please enter your OpenAI API Key!', 'error');
    //             return;
    //         }
    //         model = currentOpenAIModel;
    //         apiUrl = 'https://api.openai.com/v1/images/generations';
    //         headers['Authorization'] = `Bearer ${apiKey}`;
    //         payload = JSON.stringify({
    //             prompt: prompt,
    //             n: 1,
    //             size: "512x512",
    //             model: model
    //         });
    //     } else if (currentApiProvider === 'google-image') {
    //         apiKey = "";
    //         model = currentGoogleImageModel;
    //         apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:predict?key=${apiKey}`;
    //         payload = JSON.stringify({
    //             instances: { prompt: prompt },
    //             parameters: { "sampleCount": 1 }
    //         });
    //     }

    //     imageDisplayArea.innerHTML = ''; // Clear previous image
    //     loadingIndicator.classList.remove('hidden'); // Show loading indicator

    //     try {
    //         let response;
    //         let result;

    //         if (currentApiProvider === 'openai') {
    //             // Simulate OpenAI DALL-E API call with a placeholder
    //             await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
    //             const placeholderImageUrl = `https://placehold.co/512x512/3B82F6/ffffff?text=${model.toUpperCase().replace('-', '+')}`;
    //             const imgElement = document.createElement('img');
    //             imgElement.src = placeholderImageUrl;
    //             imgElement.alt = `Generated Image from OpenAI (${model})`;
    //             imgElement.className = "w-full h-auto rounded-md";
    //             imageDisplayArea.appendChild(imgElement);
    //             showMessage(`Simulated OpenAI (${model}) image generation successful!`);
    //         } else if (currentApiProvider === 'google-image') {
    //             response = await fetch(apiUrl, {
    //                 method: 'POST',
    //                 headers: headers,
    //                 body: JSON.stringify(payload)
    //             });
    //             result = await response.json();

    //             if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
    //                 const imageUrl = `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
    //                 const imgElement = document.createElement('img');
    //                 imgElement.src = imageUrl;
    //                 imgElement.alt = `Generated Image from Google Imagen (${model})`;
    //                 imgElement.className = "w-full h-auto rounded-md";
    //                 imageDisplayArea.appendChild(imgElement);
    //                 showMessage(`Google Imagen (${model}) image generation successful!`);
    //             } else {
    //                 showMessage(`Failed to generate image from Google Imagen (${model}). ` + (result.error ? result.error.message : 'Unknown error.'), 'error');
    //                 console.error('Google Imagen API error:', result);
    //                 imageDisplayArea.innerHTML = '<p class="text-gray-400 text-center">Error: Could not generate image. Check console for details.</p>';
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error generating image:', error);
    //         showMessage('An error occurred during image generation.', 'error');
    //         imageDisplayArea.innerHTML = '<p class="text-gray-400 text-center">Error: Could not generate image. Please check your API key and try again.</p>';
    //     } finally {
    //         loadingIndicator.classList.add('hidden'); // Hide loading indicator
    //     }
    // }


    // Initial setup
    presetsCategoriesData.forEach(category => {
        if (category.header.endsWith(' Presets')) {
            category.header = category.header.slice(0, -8); // Remove " Presets"
        }
    });

    loadCustomKeywords(); // Load custom keywords from local storage on startup
    loadUserPresets(); // Load user-defined presets on startup

    renderManualCategoriesWithOptions();
    renderPresetsCategories();
    renderUserPresets(); // Render user-defined presets after loading
    renderFormatPageInputs(); // Initial render for Format page

    subjectInputManual.addEventListener('input', updateFinalPrompt);
    subjectInputPresets.addEventListener('input', () => {
        subjectInputManual.value = subjectInputPresets.value; // Sync to master
        updateFinalPrompt();
    });
    subjectInputFormat.addEventListener('input', () => {
        subjectInputManual.value = subjectInputFormat.value; // Sync to master
        updateFinalPrompt();
    });

    // Initial API provider and model selection (Removed as Generate tab is removed)
    // const initialApiProviderButton = apiProviderToggleGroup ? apiProviderToggleGroup.querySelector(`[data-provider="${currentApiProvider}"]`) : null;
    // if (initialApiProviderButton) {
    //     initialApiProviderButton.classList.add('active');
    //     updateSliderIndicator(apiProviderToggleGroup, apiProviderSliderIndicator, initialApiProviderButton);
    // }
    // const initialOpenAIModelButton = openaiModelToggleGroup ? openaiModelToggleGroup.querySelector(`[data-model="${currentOpenAIModel}"]`) : null;
    // if (initialOpenAIModelButton) {
    //     initialOpenAIModelButton.classList.add('active');
    // }
    // const initialGoogleImageModelButton = googleImageModelToggleGroup ? googleImageModelToggleGroup.querySelector(`[data-model="${currentGoogleImageModel}"]`) : null;
    // if (initialGoogleImageModelButton) {
    //     initialGoogleImageModelButton.classList.add('active');
    // }
    // showModelSelection();


    window.addEventListener('load', () => {
        showPage('presets'); // Activate presets page by default
    });
    window.addEventListener('resize', () => {
        const activeBtn = document.querySelector('.toggle-button.active');
        if (activeBtn) {
            updateSliderIndicator(pageToggleGroup, sliderIndicator, activeBtn);
        }
        // Also update the API/model sliders on resize (Removed as Generate tab is removed)
        // const currentApiProviderButton = apiProviderToggleGroup ? apiProviderToggleGroup.querySelector(`[data-provider="${currentApiProvider}"]`) : null;
        // if (currentApiProviderButton) {
        //     updateSliderIndicator(apiProviderToggleGroup, apiProviderSliderIndicator, currentApiProviderButton);
        // }
        // if (currentApiProvider === 'openai') {
        //     const currentOpenAIModelButton = openaiModelToggleGroup ? openaiModelToggleGroup.querySelector(`[data-model="${currentOpenAIModel}"]`) : null;
        //     if (currentOpenAIModelButton) {
        //         updateSliderIndicator(openaiModelToggleGroup, openaiModelSliderIndicator, currentOpenAIModelButton);
        //     }
        // } else if (currentApiProvider === 'google-image') {
        //     const currentGoogleImageModelButton = googleImageModelToggleGroup ? googleImageModelToggleGroup.querySelector(`[data-model="${currentGoogleImageModel}"]`) : null;
        //     if (currentGoogleImageModelButton) {
        //         updateSliderIndicator(googleImageModelToggleGroup, googleImageModelSliderIndicator, currentGoogleImageModelButton);
        //     }
        // }
    });
});
