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
    if (currentStep === 3) {
        setTimeout(() => {
            completeAnalysis();
        }, 2000);
    }
    
    if (currentStep === 6) {
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
});

function showPreview() {
    const uploadArea = document.querySelector('.upload-area');
    const preview = document.getElementById('test-preview');
    
    uploadArea.style.display = 'none';
    preview.classList.remove('hidden');
}

function removeFile() {
    const uploadArea = document.querySelector('.upload-area');
    const preview = document.getElementById('test-preview');
    
    uploadArea.style.display = 'block';
    preview.classList.add('hidden');
    
    document.getElementById('file-input').value = '';
}

// Complete analysis animation
function completeAnalysis() {
    const loading = document.querySelector('.loading-animation');
    const results = document.getElementById('detection-results');
    
    loading.style.display = 'none';
    results.classList.remove('hidden');
}

// Student upload simulation for step 5
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
});

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

// Show student detail (placeholder)
function showDetail(studentId) {
    alert(`Detail študenta ${studentId} - Tu by sa zobrazilo detailné hodnotenie s feedbackom pre každú úlohu.`);
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
    
    // Reset step 3
    const loading = document.querySelector('.loading-animation');
    const detectionResults = document.getElementById('detection-results');
    if (loading && detectionResults) {
        loading.style.display = 'block';
        detectionResults.classList.add('hidden');
    }
    
    // Reset step 5
    const uploadZone = document.querySelector('.upload-zone');
    const uploadedTests = document.getElementById('uploaded-tests');
    if (uploadZone && uploadedTests) {
        uploadZone.style.display = 'block';
        uploadedTests.classList.add('hidden');
    }
    
    // Reset step 6
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
    if ((e.key === 'ArrowRight' || e.key === 'Enter') && currentStep < 7) {
        // Only auto-advance on certain steps
        if (currentStep === 1 || currentStep === 4 || currentStep === 5) {
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

