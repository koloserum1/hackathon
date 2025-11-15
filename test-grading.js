// Current step tracker
let currentStep = 1;

// Go to next step
function nextStep() {
    const current = document.getElementById(`step-${currentStep}`);
    current.classList.remove('active');
    
    currentStep++;
    
    const next = document.getElementById(`step-${currentStep}`);
    next.classList.add('active');
    
    document.getElementById('current-step-num').textContent = currentStep;
    
    // Trigger animations for specific steps
    if (currentStep === 5) {
        startGrading();
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// File upload simulation for step 2
function triggerUpload() {
    document.getElementById('file-input').click();
}

document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                showPreview();
            }
        });
    }
    
    // Drag and drop functionality
    const uploadArea = document.querySelector('.upload-area');
    if (uploadArea) {
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });
        
        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, unhighlight, false);
        });
        
        // Handle dropped files
        uploadArea.addEventListener('drop', handleDrop, false);
    }
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    const uploadArea = document.querySelector('.upload-area');
    uploadArea.classList.add('drag-over');
}

function unhighlight(e) {
    const uploadArea = document.querySelector('.upload-area');
    uploadArea.classList.remove('drag-over');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
        // Validate file type
        const file = files[0];
        const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        
        if (validTypes.includes(file.type)) {
            // Update the file input with the dropped file
            const fileInput = document.getElementById('file-input');
            fileInput.files = files;
            showPreview();
        } else {
            alert('Prosím nahrajte súbor vo formáte PDF, JPG alebo PNG');
        }
    }
}

function showPreview() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    
    if (!file) return;
    
    const uploadArea = document.querySelector('.upload-area');
    const preview = document.getElementById('test-preview');
    const previewContainer = document.getElementById('preview-container');
    const fileNameDisplay = document.getElementById('file-name-display');
    
    // Update file name
    fileNameDisplay.textContent = file.name;
    
    // Clear previous preview
    previewContainer.innerHTML = '';
    
    // Check if file is an image
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.borderRadius = '12px';
            img.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
        // For PDF, show a placeholder with file info
        const pdfPlaceholder = document.createElement('div');
        pdfPlaceholder.className = 'pdf-placeholder';
        pdfPlaceholder.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; background: #f5f5f7; border-radius: 12px;">
                <div style="font-size: 64px; margin-bottom: 16px;">📄</div>
                <h3 style="color: #1d1d1f; margin-bottom: 8px;">${file.name}</h3>
                <p style="color: #86868b; font-size: 14px;">PDF súbor • ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <p style="color: #86868b; font-size: 14px; margin-top: 16px;">Náhľad bude dostupný po spracovaní</p>
            </div>
        `;
        previewContainer.appendChild(pdfPlaceholder);
    }
    
    uploadArea.style.display = 'none';
    preview.classList.remove('hidden');
}

function removeFile() {
    const uploadArea = document.querySelector('.upload-area');
    const preview = document.getElementById('test-preview');
    const previewContainer = document.getElementById('preview-container');
    
    uploadArea.style.display = 'block';
    preview.classList.add('hidden');
    
    // Clear preview
    previewContainer.innerHTML = '';
    
    // Reset file input
    document.getElementById('file-input').value = '';
}

// Student upload simulation for step 4
function triggerStudentUpload() {
    document.getElementById('student-file-input').click();
}

document.addEventListener('DOMContentLoaded', function() {
    const studentFileInput = document.getElementById('student-file-input');
    if (studentFileInput) {
        studentFileInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                showUploadedTests();
            }
        });
    }
    
    // Drag and drop for student uploads (Step 5)
    const uploadZone = document.querySelector('.upload-zone');
    if (uploadZone) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, preventDefaults, false);
        });
        
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadZone.addEventListener(eventName, highlightZone, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, unhighlightZone, false);
        });
        
        uploadZone.addEventListener('drop', handleStudentDrop, false);
    }
});

function highlightZone(e) {
    const uploadZone = document.querySelector('.upload-zone');
    uploadZone.classList.add('drag-over');
}

function unhighlightZone(e) {
    const uploadZone = document.querySelector('.upload-zone');
    uploadZone.classList.remove('drag-over');
}

function handleStudentDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
        const studentFileInput = document.getElementById('student-file-input');
        studentFileInput.files = files;
        showUploadedTests();
    }
}

function showUploadedTests() {
    const uploadZone = document.querySelector('.upload-zone');
    const uploadedTests = document.getElementById('uploaded-tests');
    
    uploadZone.style.display = 'none';
    uploadedTests.classList.remove('hidden');
}

// Grading progress animation
function startGrading() {
    const progressFill = document.getElementById('progress-fill');
    const progressPercent = document.getElementById('progress-percent');
    const progressItems = document.querySelectorAll('.progress-item');
    
    let progress = 33;
    
    // Grade second student after 1.5s
    setTimeout(() => {
        progressItems[1].classList.remove('active');
        progressItems[1].classList.add('completed');
        progressItems[1].querySelector('.progress-icon').innerHTML = '✓';
        progressItems[1].querySelector('.progress-text span').textContent = 'Vyhodnotené • 19/20 bodov';
        
        progressItems[2].classList.add('active');
        progressItems[2].querySelector('.progress-icon').className = 'progress-icon spinner-small';
        progressItems[2].querySelector('.progress-text span').textContent = 'Vyhodnocujem...';
        
        progress = 66;
        progressFill.style.width = progress + '%';
        progressPercent.textContent = progress + '%';
    }, 1500);
    
    // Grade third student after 3s
    setTimeout(() => {
        progressItems[2].classList.remove('active');
        progressItems[2].classList.add('completed');
        progressItems[2].querySelector('.progress-icon').innerHTML = '✓';
        progressItems[2].querySelector('.progress-text span').textContent = 'Vyhodnotené • 15/20 bodov';
        
        progress = 100;
        progressFill.style.width = progress + '%';
        progressPercent.textContent = progress + '%';
        
        // Auto-advance to results after completion
        setTimeout(() => {
            nextStep();
        }, 1000);
    }, 3000);
}

// Show student detail - redirect to detail page
function showDetail(studentId) {
    window.location.href = 'student-detail.html';
}

// Update total points in Step 4
function updateTotal() {
    const inputs = document.querySelectorAll('.points-input-new');
    let total = 0;
    inputs.forEach(input => {
        total += parseInt(input.value) || 0;
    });
    const totalElement = document.getElementById('total-points');
    if (totalElement) {
        totalElement.textContent = total;
    }
}

// Reset demo
function resetDemo() {
    // Hide current step
    const current = document.getElementById(`step-${currentStep}`);
    current.classList.remove('active');
    
    // Reset to step 1
    currentStep = 1;
    const first = document.getElementById('step-1');
    first.classList.add('active');
    document.getElementById('current-step-num').textContent = '1';
    
    // Reset step 2
    const uploadArea = document.querySelector('.upload-area');
    const preview = document.getElementById('test-preview');
    if (uploadArea && preview) {
        uploadArea.style.display = 'block';
        preview.classList.add('hidden');
    }
    
    // Reset step 4
    const uploadZone = document.querySelector('.upload-zone');
    const uploadedTests = document.getElementById('uploaded-tests');
    if (uploadZone && uploadedTests) {
        uploadZone.style.display = 'block';
        uploadedTests.classList.add('hidden');
    }
    
    // Reset step 5
    const progressFill = document.getElementById('progress-fill');
    const progressPercent = document.getElementById('progress-percent');
    if (progressFill && progressPercent) {
        progressFill.style.width = '33%';
        progressPercent.textContent = '33%';
    }
    
    const progressItems = document.querySelectorAll('.progress-item');
    progressItems.forEach((item, index) => {
        item.classList.remove('completed', 'active');
        if (index === 0) {
            item.classList.add('completed');
            item.querySelector('.progress-icon').innerHTML = '✓';
            item.querySelector('.progress-text span').textContent = 'Vyhodnotené • 18/20 bodov';
        } else if (index === 1) {
            item.classList.add('active');
            item.querySelector('.progress-icon').className = 'progress-icon spinner-small';
            item.querySelector('.progress-text span').textContent = 'Vyhodnocujem...';
        } else {
            item.querySelector('.progress-icon').innerHTML = '⏳';
            item.querySelector('.progress-text span').textContent = 'Čaká v rade';
        }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Right arrow or Enter for next step (except on last step)
    if ((e.key === 'ArrowRight' || e.key === 'Enter') && currentStep < 6) {
        // Only auto-advance on certain steps
        if (currentStep === 1 || currentStep === 3 || currentStep === 4) {
            // Don't auto-advance, user needs to click button
            return;
        }
    }
    
    // Left arrow for previous step (only for demo purposes)
    if (e.key === 'ArrowLeft' && currentStep > 1) {
        const current = document.getElementById(`step-${currentStep}`);
        current.classList.remove('active');
        
        currentStep--;
        
        const prev = document.getElementById(`step-${currentStep}`);
        prev.classList.add('active');
        
        document.getElementById('current-step-num').textContent = currentStep;
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

