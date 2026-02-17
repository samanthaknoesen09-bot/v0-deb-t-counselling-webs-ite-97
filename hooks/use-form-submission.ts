import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import type { APIResponse } from '@/lib/types'

interface UseFormSubmissionOptions<T> {
  successMessage?: string
  errorMessage?: string
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

export function useFormSubmission<T>(
  submitFn: (data: T) => Promise<APIResponse<T>>,
  options: UseFormSubmissionOptions<T> = {}
) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = useCallback(
    async (formData: T) => {
      setIsSubmitting(true)
      setError(null)

      try {
        const response = await submitFn(formData)

        if (response.success) {
          toast.success(options.successMessage || 'Success!')
          if (options.onSuccess && response.data) {
            options.onSuccess(response.data)
          }
        } else {
          const errorMsg = response.error?.message || 'An error occurred'
          setError(errorMsg)
          toast.error(options.errorMessage || errorMsg)
          if (options.onError) {
            options.onError(new Error(errorMsg))
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
        toast.error(options.errorMessage || errorMessage)
        if (options.onError) {
          options.onError(err instanceof Error ? err : new Error(errorMessage))
        }
      } finally {
        setIsSubmitting(false)
      }
    },
    [submitFn, options]
  )

  return { isSubmitting, error, handleSubmit }
}
```

5. **Save the file** ✅

---

# 📂 YOUR FOLDER STRUCTURE SHOULD LOOK LIKE THIS:
```
your-project/
├── app/
│   ├── api/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
├── lib/                    ← CREATE THIS FOLDER IF IT DOESN'T EXIST
│   ├── types.ts           ← CREATE THIS FILE (FILE 3)
│   └── utils.ts           ← (This might already exist)
├── hooks/                  ← CREATE THIS FOLDER IF IT DOESN'T EXIST
│   └── use-form-submission.ts  ← CREATE THIS FILE (FILE 4)
├── next.config.mjs
├── middleware.ts
└── package.json
```

---

# 🎯 QUICK VISUAL GUIDE

## For FILE 3 (`lib/types.ts`):
```
1. Right-click on your project root
2. Look for "lib" folder
   - Found it? Open it
   - Not found? Create new folder → name it "lib"
3. Inside "lib" folder:
   - Right-click → New File
   - Name it: types.ts
4. Paste the code I provided above
5. Save (Ctrl+S or Cmd+S)
```

## For FILE 4 (`hooks/use-form-submission.ts`):
```
1. Right-click on your project root
2. Look for "hooks" folder
   - Found it? Open it
   - Not found? Create new folder → name it "hooks"
3. Inside "hooks" folder:
   - Right-click → New File
   - Name it: use-form-submission.ts
4. Paste the code I provided above
5. Save (Ctrl+S or Cmd+S)
```

---

# ✅ HOW TO VERIFY YOU DID IT CORRECTLY

After creating both files, your VS Code (or editor) should show:
```
EXPLORER
├── 📁 lib
│   └── 📄 types.ts          ← You should see this
├── 📁 hooks
│   └── 📄 use-form-submission.ts  ← You should see this
