using System.ComponentModel.DataAnnotations;

namespace NotesApp.Models;

public class Note
{
    public int NoteId { get; set; }
    public string? Title { get; set; }
    public string? Content { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? UpdatedAt { get; set; }
    [Required]
    public int UserId { get; set; }
    public User? User { get; set; }
}