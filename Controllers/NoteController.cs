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
        public async Task<IActionResult> Create(Note note)
        {
            if (!ModelState.IsValid)
            {
                return View(note);
            }

            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Index()
        {
            var notes = await _context.Notes.ToListAsync();
            return View(notes);
        }

        public IActionResult Details()
        {
            return View();
        }

        public IActionResult Edit()
        {
            return View();
        }



    }
}