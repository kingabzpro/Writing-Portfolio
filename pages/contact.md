---
layout: default
title: Contact Me
---

# Contact Me

I'd love to hear from you! Whether you have a question about my articles, want to discuss a potential collaboration, or just want to say hello, feel free to reach out using any of the methods below.

## Contact Form

<div class="contact-form-container" style="max-width: 600px; margin: 0 auto;">
  <form action="https://formspree.io/f/your-formspree-id" method="POST" style="display: flex; flex-direction: column; gap: 15px;">
    <div>
      <label for="name" style="display: block; margin-bottom: 5px; font-weight: bold;">Name:</label>
      <input type="text" id="name" name="name" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
    </div>
    
    <div>
      <label for="email" style="display: block; margin-bottom: 5px; font-weight: bold;">Email:</label>
      <input type="email" id="email" name="email" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
    </div>
    
    <div>
      <label for="subject" style="display: block; margin-bottom: 5px; font-weight: bold;">Subject:</label>
      <input type="text" id="subject" name="subject" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
    </div>
    
    <div>
      <label for="message" style="display: block; margin-bottom: 5px; font-weight: bold;">Message:</label>
      <textarea id="message" name="message" rows="5" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"></textarea>
    </div>
    
    <button type="submit" style="background-color: var(--primary-color); color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; font-weight: bold; align-self: flex-start;">Send Message</button>
  </form>
</div>

## Alternative Contact Methods

<div class="contact-methods" style="margin-top: 30px;">
  <div class="contact-method" style="margin-bottom: 15px;">
    <i class="fab fa-linkedin" style="color: var(--secondary-color); font-size: 1.2em; margin-right: 10px;"></i>
    <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/1abidaliawan" target="_blank">1abidaliawan</a>
  </div>
  
  <div class="contact-method" style="margin-bottom: 15px;">
    <i class="fab fa-github" style="color: var(--secondary-color); font-size: 1.2em; margin-right: 10px;"></i>
    <strong>GitHub:</strong> <a href="https://github.com/kingabzpro" target="_blank">kingabzpro</a>
  </div>
  
  <div class="contact-method" style="margin-bottom: 15px;">
    <i class="fab fa-twitter" style="color: var(--secondary-color); font-size: 1.2em; margin-right: 10px;"></i>
    <strong>Twitter:</strong> <a href="https://twitter.com/1abidaliawan" target="_blank">@1abidaliawan</a>
  </div>
</div>

<script>
  // Formbutton widget integration
  window.formbutton=window.formbutton||function(){(formbutton.q=formbutton.q||[]).push(arguments);};
  formbutton({
    action: "https://formspree.io/f/your-formspree-id",
    title: "How can I help?",
    fields: [
      { 
        type: "text", 
        label: "Name:", 
        name: "name",
        required: true,
        placeholder: "Your name"
      },
      { 
        type: "email", 
        label: "Email:", 
        name: "email",
        required: true,
        placeholder: "your@email.com"
      },
      {
        type: "textarea",
        label: "Message:",
        name: "message",
        placeholder: "What's on your mind?",
        required: true,
      },
      { type: "submit" }
    ],
    styles: {
      title: {
        backgroundColor: "var(--primary-color)",
      },
      button: {
        backgroundColor: "var(--secondary-color)",
      }
    },
    buttonImg: "<i class='fas fa-comment-dots' style='font-size:24px'></i>",
  });
</script>

<a href="/" class="button" style="display: flex; align-items: center; justify-content: center; padding: 4px 12px; width: max-content; background: var(--primary-color); color: white; text-decoration: none; border-radius: 4px; margin-top: 30px; font-weight: bold; font-size: 1em; transition: transform 0.2s ease;"><i class="fas fa-home"></i><span style="margin-left: 5px;">Back to Home</span></a>