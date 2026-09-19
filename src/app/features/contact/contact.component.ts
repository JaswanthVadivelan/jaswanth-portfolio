import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PROFILE_DATA } from '../../data/profile.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="contact" class="py-20 bg-white border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold font-mono mb-3">
            <span>13</span>
            <span>/</span>
            <span>GET IN TOUCH</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Connect for Opportunities
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Interested in discussing software engineering, data analytics, or AI development roles? Feel free to reach out directly.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <!-- Direct Channels & Info (5 cols) -->
          <div class="lg:col-span-5 space-y-6">
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
              <h3 class="text-base font-bold text-slate-900">Direct Contact Channels</h3>

              <!-- Email -->
              @if (profile.socials.email) {
                <div class="flex items-start gap-3">
                  <div class="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span class="block text-xs text-slate-500 font-medium">Direct Email</span>
                    <a [href]="'mailto:' + profile.socials.email" class="text-sm font-semibold text-blue-600 hover:underline">
                      {{ profile.socials.email }}
                    </a>
                  </div>
                </div>
              }

              <!-- Location -->
              <div class="flex items-start gap-3">
                <div class="w-9 h-9 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span class="block text-xs text-slate-500 font-medium">Location</span>
                  <span class="text-sm font-semibold text-slate-900">{{ profile.location }}</span>
                </div>
              </div>

              <!-- Social Links -->
              <div class="pt-4 border-t border-slate-200/80 flex items-center gap-3">
                @if (profile.socials.github) {
                  <a
                    [href]="profile.socials.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
                  >
                    <span>GitHub Profile</span>
                  </a>
                }
                @if (profile.socials.linkedin) {
                  <a
                    [href]="profile.socials.linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 hover:bg-blue-100 flex items-center gap-1.5 transition-colors"
                  >
                    <span>LinkedIn Profile</span>
                  </a>
                }
              </div>
            </div>

            <div class="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-blue-800 leading-relaxed">
              <strong>Notice:</strong> This portfolio form runs entirely client-side. Submitting the form validates all fields and previews the interaction. For direct inquiries, please send an email to <a [href]="'mailto:' + profile.socials.email" class="font-bold underline">{{ profile.socials.email }}</a>.
            </div>
          </div>

          <!-- Contact Form (7 cols) -->
          <div class="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-4" novalidate>
              
              <!-- Honeypot anti-spam field (hidden) -->
              <input type="text" formControlName="honeypot" class="hidden" tabindex="-1" autocomplete="off" />

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Name -->
                <div>
                  <label for="name" class="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name <span class="text-rose-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    formControlName="name"
                    placeholder="e.g. Jane Doe"
                    class="w-full px-3.5 py-2 text-xs rounded-xl bg-white border text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    [class.border-rose-400]="isFieldInvalid('name')"
                    [class.border-slate-200]="!isFieldInvalid('name')"
                    aria-required="true"
                  />
                  @if (isFieldInvalid('name')) {
                    <span class="text-[11px] text-rose-500 mt-1 block">Please enter your name (min 2 chars).</span>
                  }
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block text-xs font-semibold text-slate-700 mb-1">
                    Your Email <span class="text-rose-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    formControlName="email"
                    placeholder="e.g. jane@company.com"
                    class="w-full px-3.5 py-2 text-xs rounded-xl bg-white border text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    [class.border-rose-400]="isFieldInvalid('email')"
                    [class.border-slate-200]="!isFieldInvalid('email')"
                    aria-required="true"
                  />
                  @if (isFieldInvalid('email')) {
                    <span class="text-[11px] text-rose-500 mt-1 block">Please provide a valid email address.</span>
                  }
                </div>
              </div>

              <!-- Subject -->
              <div>
                <label for="subject" class="block text-xs font-semibold text-slate-700 mb-1">
                  Subject / Opportunity Type <span class="text-rose-500">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  formControlName="subject"
                  placeholder="e.g. Software Engineer Role Inquiry"
                  class="w-full px-3.5 py-2 text-xs rounded-xl bg-white border text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  [class.border-rose-400]="isFieldInvalid('subject')"
                  [class.border-slate-200]="!isFieldInvalid('subject')"
                  aria-required="true"
                />
                @if (isFieldInvalid('subject')) {
                  <span class="text-[11px] text-rose-500 mt-1 block">Please enter a subject.</span>
                }
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="block text-xs font-semibold text-slate-700 mb-1">
                  Message <span class="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  formControlName="message"
                  rows="4"
                  placeholder="Provide any details about the position, team, or project..."
                  class="w-full px-3.5 py-2 text-xs rounded-xl bg-white border text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  [class.border-rose-400]="isFieldInvalid('message')"
                  [class.border-slate-200]="!isFieldInvalid('message')"
                  aria-required="true"
                ></textarea>
                @if (isFieldInvalid('message')) {
                  <span class="text-[11px] text-rose-500 mt-1 block">Please enter a message (min 10 characters).</span>
                }
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                [disabled]="isSubmitting()"
                class="w-full py-3 px-6 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all duration-200"
              >
                {{ isSubmitting() ? 'Validating Payload...' : 'Send Message' }}
              </button>

              <!-- Success Notification -->
              @if (isSubmitted()) {
                <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 animate-in fade-in duration-200">
                  <div class="font-bold mb-1">Message Validated Successfully!</div>
                  <p class="leading-relaxed">
                    Thank you, <strong>{{ submittedName() }}</strong>. Your form submission has passed all client-side validation checks. Please feel free to also reach out directly at <a [href]="'mailto:' + profile.socials.email" class="underline font-bold">{{ profile.socials.email }}</a>.
                  </p>
                </div>
              }

            </form>
          </div>

        </div>

      </div>
    </section>
  `
})
export class ContactComponent {
  readonly profile = PROFILE_DATA;
  readonly contactForm: FormGroup;
  readonly isSubmitting = signal<boolean>(false);
  readonly isSubmitted = signal<boolean>(false);
  readonly submittedName = signal<string>('');

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      honeypot: ['']
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.contactForm.get('honeypot')?.value) {
      // Spam caught
      return;
    }

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    setTimeout(() => {
      this.submittedName.set(this.contactForm.get('name')?.value || '');
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);
      this.contactForm.reset();
    }, 600);
  }
}

