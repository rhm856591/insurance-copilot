# Mobile-First Quick Reference

## Common Patterns

### Responsive Text Sizes
```tsx
text-xs md:text-sm lg:text-base      // Body text
text-sm md:text-base lg:text-lg      // Subheadings
text-base md:text-lg lg:text-xl      // Headings
text-lg md:text-xl lg:text-2xl       // Page titles
```

### Responsive Spacing
```tsx
p-3 md:p-4 lg:p-6                    // Padding
gap-2 md:gap-4 lg:gap-6              // Gap
space-y-3 md:space-y-4 lg:space-y-6  // Vertical spacing
mb-3 md:mb-4 lg:mb-6                 // Margin bottom
```

### Responsive Layouts
```tsx
// Stack on mobile, row on desktop
flex flex-col md:flex-row

// 1 column mobile, 2 tablet, 3 desktop
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3

// Full width mobile, constrained desktop
w-full md:w-auto md:max-w-md

// Hide on mobile, show on desktop
hidden md:block

// Show on mobile, hide on desktop
block md:hidden
```

### Touch-Friendly Components
```tsx
// Buttons
min-h-[44px] min-w-[44px] active:scale-95

// Inputs
min-h-[44px] text-base px-3 md:px-4

// Cards
p-3 md:p-4 lg:p-6 active:scale-[0.98]

// Icons
size={16} md:size={20} lg:size={24}
```

### Modal Patterns
```tsx
// Mobile: Bottom sheet
rounded-t-2xl md:rounded-lg
items-end md:items-center

// Sticky header/footer
sticky top-0 bg-white z-10
sticky bottom-0 bg-gray-50
```

### Responsive Grids
```tsx
// Stats cards
grid-cols-2 md:grid-cols-4

// Content cards
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

// Form fields
grid-cols-1 md:grid-cols-2
```

### Typography Truncation
```tsx
// Single line
truncate

// Multi-line with min-width
min-w-0 truncate

// Responsive truncation
truncate md:whitespace-normal
```

### Responsive Badges
```tsx
text-[10px] md:text-xs lg:text-sm
px-2 py-1 md:px-3 md:py-1.5
```

### Responsive Icons
```tsx
<Icon size={14} className="md:w-4 md:h-4 lg:w-5 lg:h-5" />
```

## Component Templates

### Responsive Card
```tsx
<Card className="p-3 md:p-4 lg:p-6 active:scale-[0.98] transition-transform">
  <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
    Title
  </h3>
  <div className="space-y-2 md:space-y-3">
    {/* Content */}
  </div>
</Card>
```

### Responsive Button Group
```tsx
<div className="flex flex-col sm:flex-row gap-2 md:gap-3">
  <Button className="w-full sm:w-auto">Primary</Button>
  <Button variant="outline" className="w-full sm:w-auto">Secondary</Button>
</div>
```

### Responsive Form Field
```tsx
<div className="space-y-2">
  <label className="text-sm md:text-base font-medium">
    Label
  </label>
  <input
    className="w-full px-3 md:px-4 py-2.5 md:py-3 text-base min-h-[44px]"
  />
</div>
```

### Responsive List Item
```tsx
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 md:p-4">
  <div className="flex-1 min-w-0">
    <h4 className="text-sm md:text-base font-medium truncate">Title</h4>
    <p className="text-xs md:text-sm text-gray-600">Description</p>
  </div>
  <Badge className="w-fit text-[10px] md:text-xs">Status</Badge>
</div>
```

### Responsive Stats Card
```tsx
<Card className="active:scale-[0.98] transition-transform">
  <div className="flex items-center justify-between gap-2">
    <div className="min-w-0 flex-1">
      <p className="text-[10px] md:text-sm text-gray-600 truncate">
        Label
      </p>
      <p className="text-lg md:text-2xl font-bold mt-1">
        Value
      </p>
    </div>
    <Icon className="flex-shrink-0" size={18} />
  </div>
</Card>
```

## Breakpoint Reference

| Breakpoint | Min Width | Typical Device |
|------------|-----------|----------------|
| xs         | 375px     | Small phones   |
| sm         | 640px     | Large phones   |
| md         | 768px     | Tablets        |
| lg         | 1024px    | Small laptops  |
| xl         | 1280px    | Desktops       |
| 2xl        | 1536px    | Large screens  |

## Common Mistakes to Avoid

❌ **Don't**: Use fixed widths
```tsx
<div className="w-[500px]">
```

✅ **Do**: Use responsive widths
```tsx
<div className="w-full md:max-w-md lg:max-w-lg">
```

---

❌ **Don't**: Start with desktop sizes
```tsx
<div className="text-lg md:text-sm">
```

✅ **Do**: Start with mobile sizes
```tsx
<div className="text-sm md:text-base lg:text-lg">
```

---

❌ **Don't**: Use small touch targets
```tsx
<button className="p-1">
```

✅ **Do**: Use minimum 44px touch targets
```tsx
<button className="min-h-[44px] min-w-[44px] p-2">
```

---

❌ **Don't**: Forget flex-shrink
```tsx
<div className="flex">
  <Icon size={20} />
  <span>Long text that might wrap</span>
</div>
```

✅ **Do**: Add flex-shrink-0 to icons
```tsx
<div className="flex gap-2">
  <Icon size={20} className="flex-shrink-0" />
  <span className="min-w-0">Long text that might wrap</span>
</div>
```

## Testing Commands

```bash
# Test on different viewports
npm run dev

# Then open in browser and test:
# - Mobile: 375px, 414px
# - Tablet: 768px, 1024px
# - Desktop: 1280px, 1920px
```

## Browser DevTools

### Chrome/Edge
1. Open DevTools (F12)
2. Click device toolbar (Ctrl+Shift+M)
3. Select device or enter custom dimensions
4. Test touch events with device mode

### Safari
1. Open Web Inspector (Cmd+Option+I)
2. Enable Responsive Design Mode (Cmd+Ctrl+R)
3. Select device or enter custom dimensions

### Firefox
1. Open Developer Tools (F12)
2. Click Responsive Design Mode (Ctrl+Shift+M)
3. Select device or enter custom dimensions
