# Test Fayllar

Bu papkada har bir mavzu uchun test savollari JSON formatida joylashgan.

## Format:

Har bir test fayli quyidagi strukturaga ega:

```json
{
  "mavzu_id": 1,
  "mavzu_nomi": "Mavzu nomi",
  "test_info": {
    "jami_savollar": 10,
    "vaqt_limit": 15,
    "otish_ball": 70
  },
  "savollar": [
    {
      "id": 1,
      "savol": "Savol matni?",
      "variantlar": {
        "a": "Birinchi variant",
        "b": "Ikkinchi variant",
        "c": "Uchinchi variant",
        "d": "To'rtinchi variant"
      },
      "togri_javob": "b"
    }
  ]
}
```

## Fayl nomlari:

- `1-mavzu-test.json` - 1-chi mavzu testi
- `2-mavzu-test.json` - 2-chi mavzu testi
- `3-mavzu-test.json` - 3-chi mavzu testi
- ...
- `20-mavzu-test.json` - 20-chi mavzu testi

## Testlar haqida:

- ✅ Har bir mavzu uchun 10 ta savol
- ✅ Har bir savol 4 ta variant (a, b, c, d)
- ✅ Vaqt limiti: 15 daqiqa
- ✅ O'tish balli: 70%

Hozircha 3 ta mavzu uchun test savollari tayyor. Qolgan 17 ta mavzu uchun shunga o'xshash formatda testlar yaratiladi.
