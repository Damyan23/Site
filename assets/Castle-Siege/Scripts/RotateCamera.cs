using Unity.VisualScripting;
using UnityEngine;

/// <summary>
/// Handles the rotation of the camera around a target point.
/// </summary>
public class RotateCamera : MonoBehaviour
{
    [SerializeField]private float rotationSpeed = 10f; // Speed of rotation
    [SerializeField] private Transform targetPoint;

    /// <summary>
    /// Rotates the camera around the target point at the specified speed.
    /// </summary>
    private void Update()
    {
        // Rotate around the target point
        transform.RotateAround(targetPoint.position, Vector3.up, rotationSpeed * Time.deltaTime);
    }
}
