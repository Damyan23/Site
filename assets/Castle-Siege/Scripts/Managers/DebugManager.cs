using UnityEngine;
using System.Collections.Generic;

public class DebugManager : MonoBehaviour
{
    private bool instantKillEnabled = false;
    private bool infiniteMoneyEnabled = false;
    private bool invincibleBaseEnabled = false;

    private GameManager gameManager;
    private Castle castle;

    private Dictionary<Enemy, float> enemyDamageValues = new();

    void Start()
    {
        gameManager = GameManager.instance;
        castle = FindObjectOfType<Castle>();
    }

    void Update()
    {
        // Example key bindings for toggling debug features
        if (Input.GetKeyDown(KeyCode.K)) ToggleInstantKill();
        if (Input.GetKeyDown(KeyCode.M)) ToggleInfiniteMoney();
        if (Input.GetKeyDown(KeyCode.I)) ToggleInvincibleBase();
        if (Input.GetKeyDown(KeyCode.G)) TriggerGameOver();
        
        // If instant kill is enabled, continuously check for active enemies
        if (instantKillEnabled)
        {
            KillAllActiveEnemies();
        }

        foreach (Enemy enemy in Enemy.activeEnemies)
        {
            UpdateEnemyDamage(enemy, invincibleBaseEnabled);
        }
    }

    public void ToggleInstantKill()
    {
        instantKillEnabled = !instantKillEnabled;
        Debug.Log($"Instant Kill: {(instantKillEnabled ? "Enabled" : "Disabled")}");
    }
    
    private void KillAllActiveEnemies()
    {
        // Kill all currently active enemies
        foreach (Enemy enemy in new List<Enemy>(Enemy.activeEnemies))
        {
            if (enemy != null)
            {
                enemy.TakeDamage(enemy.maxHealth * 10);
            }
        }
    }


    public void ToggleInfiniteMoney()
    {
        infiniteMoneyEnabled = !infiniteMoneyEnabled;
        Debug.Log($"Infinite Money: {(infiniteMoneyEnabled ? "Enabled" : "Disabled")}");

        if (infiniteMoneyEnabled)
        {
            // Subscribe to the onGoldRemovedEvent when infinite money is enabled
            EventManager.OnGoldRemovedEvent += HandleGoldRemoved;
        }
        else
        {
            // Unsubscribe from the onGoldRemovedEvent when infinite money is disabled
            EventManager.OnGoldRemovedEvent -= HandleGoldRemoved;
        }
    }

    private void HandleGoldRemoved(int amount)
    {
        if (infiniteMoneyEnabled)
        {
            // Add back the removed gold to simulate infinite money
            gameManager.GoldManager.adddGold(amount);
        }
    }

    public void ToggleInvincibleBase()
    {
        invincibleBaseEnabled = !invincibleBaseEnabled;
        Debug.Log($"Invincible Base: {(invincibleBaseEnabled ? "Enabled" : "Disabled")}");

    }

    void UpdateEnemyDamage(Enemy enemy, bool shouldUpdate)
    {
        if (shouldUpdate) 
        {
            SetEnemyDamageToZero(enemy);
        }
        else if (!shouldUpdate)
        {

            if (enemyDamageValues.ContainsKey(enemy))
            {
                enemy.damage = enemyDamageValues[enemy]; // Restore original damage
                enemyDamageValues.Remove(enemy);
            }
        }
    } 
    
    void SetEnemyDamageToZero(Enemy enemy)
    {
        if (enemy != null && !enemyDamageValues.ContainsKey(enemy))
        {
            enemyDamageValues[enemy] = enemy.damage; // Store original damage
            enemy.damage = 0; // Set damage to zero
        }
    }

    public void TriggerGameOver()
    {
        castle.TakeDamage(castle.currentHealth);
    }
}