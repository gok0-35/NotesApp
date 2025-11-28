using System.ComponentModel.DataAnnotations;

namespace NotesApp.Models;

public class User
{
    public int UserId { get; set; }
    [Required]
    public string? Username { get; set; }
    [EmailAddress]
    public string? Email { get; set; }
    [Required]
    public string Password { get; set; } = string.Empty;
    [Compare("Password", ErrorMessage = "Passwords do not match.")]
    public string PasswordAgain { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public ICollection<Note> Notes { get; set; } = new List<Note>();

}