using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NotesApp.Data;
using NotesApp.Models;

namespace NotesApp.Controllers
{
    public class NoteController : Controller
    {
        private readonly NotesDbContext _context;

        public NoteController(NotesDbContext context)
        {
            _context = context;
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Note note)
        {
            if (!ModelState.IsValid)
            {
                return View(note);
            }

            var userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null)
            {
                return RedirectToAction("Login", "User");
            }

            note.UserId = userId.Value;
            note.UpdatedAt = DateTime.Now;
            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        public async Task<IActionResult> Index()
        {
            var userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null)
            {
                return RedirectToAction("Login", "User");
            }

            var notes = await _context.Notes
                .Where(n => n.UserId == userId.Value)
                .ToListAsync();
            return View(notes);
        }

        public async Task<IActionResult> Details(int id)
        {
            if (id == 0)
            {
                return NotFound();
            }

            var userId = HttpContext.Session.GetInt32("UserId");
            var note = await _context.Notes
                .FirstOrDefaultAsync(n => n.NoteId == id && n.UserId == userId);

            if (note == null)
            {
                return NotFound();
            }

            return View(note);
        }


        public async Task<IActionResult> Edit(int id)
        {
            if (id == 0)
            {
                return NotFound();
            }
            var userId = HttpContext.Session.GetInt32("UserId");
            var note = await _context.Notes
                .FirstOrDefaultAsync(n => n.NoteId == id && n.UserId == userId);
            if (note == null)
            {
                return NotFound();
            }
            return View(note);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Note note)
        {
            if (ModelState.IsValid)
            {
                var userId = HttpContext.Session.GetInt32("UserId");
                var existingNote = await _context.Notes
                    .FirstOrDefaultAsync(n => n.NoteId == note.NoteId && n.UserId == userId);
                if (existingNote != null)
                {
                    existingNote.Title = note.Title;
                    existingNote.Content = note.Content;
                    existingNote.UpdatedAt = DateTime.Now;

                    await _context.SaveChangesAsync();

                    return RedirectToAction(nameof(Index));
                }
                else
                {
                    return NotFound();
                }
            }
            return View(note);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            if (id == 0)
            {
                return NotFound();
            }

            var userId = HttpContext.Session.GetInt32("UserId");
            var note = await _context.Notes
                .FirstOrDefaultAsync(n => n.NoteId == id && n.UserId == userId);
            if (note == null)
            {
                return NotFound();
            }
            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));

        }

    }
}